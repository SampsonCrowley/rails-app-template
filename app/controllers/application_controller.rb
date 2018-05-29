class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :get_meta_data, except: [:oembed]

  def oembed
    path = params[:url].split(/.*?\/\/.*\//)[1]
    path_data(path)
    respond_to do |format|
      format.json do
      end
      format.xml do
      end
    end
  end

  def fallback_index_html
    render html: '', layout: true
  end

  private
    def get_meta_data
      @meta_data ||= {
        title: title,
        gschema: gschema,
        ograph: ograph,
        twitter: twitter,
      }
    end

    def title
      unless @title
        puts "\n\n\n\n\n TITLEING #{Time.now.to_s} \n\n\n\n\n"
        puts route_info
      end
      @title ||= path_data[:title].presence || "DefaultAppName"
    end

    def oembed
      @oembed ||= {

      }
    end

    def oembed_discovery
      @oembed_discovery ||= %Q(
        <link rel="alternate" type="application/json+oembed" href="#{route_info[:domain].to_s}/oembed.json?url=#{url_encode(request.original_url)}" title="#{title}" />
        <link rel="alternate" type="text/xml+oembed" href="#{route_info[:domain].to_s}/oembed.xml?url=#{url_encode(request.original_url)}" title="#{title}" />
      ).html_safe
    end

    def gschema
      @gschema ||= %Q(
        <link rel="canonical" href="#{route_info[:domain].to_s}#{path_data[:canonical].to_s}">
        <meta itemprop="name" content="#{title}">
        <meta itemprop="description" content="#{path_data[:description].to_s}">
        #{path_data[:image].present? ? %Q(<meta itemprop="image" content="#{route_info[:domain].to_s}/#{path_data[:image].to_s}">) : ''}
      ).html_safe
    end

    def ograph
      @ograph ||= %Q(
        <meta property="og:url" content="#{route_info[:domain].to_s}#{path_data[:canonical].to_s}">
        <meta property="og:type" content="website">
        <meta property="og:title" content="#{title}">
        #{path_data[:image].present? ? %Q(<meta property="og:image" content="#{route_info[:domain].to_s}/#{path_data[:image].to_s}">) : ''}
        <meta property="og:description" content="#{path_data[:description].to_s}">
        <meta property="og:site_name" content="DefaultAppName">
        <meta property="og:locale" content="en_US">
      ).html_safe
    end


    def twitter
      @twitter ||= %Q(
        <meta name="twitter:card" content="summary">
        <meta name="twitter:url" content="#{route_info[:domain].to_s}#{path_data[:canonical].to_s}">
        <meta name="twitter:title" content="#{title}">
        <meta name="twitter:description" content="#{path_data[:description].to_s}">
        #{path_data[:image].present? ? %Q(<meta name="twitter:image" content="#{route_info[:domain].to_s}/#{path_data[:image].to_s}">) : ''}
      )
    end

    def path_data(data = nil)
      @path_data ||= get_path_data(data)
    end

    def fetch(uri_str, limit = 10)
      require 'net/http'

      raise ArgumentError, 'too many HTTP redirects' if limit == 0

      resulting = Net::HTTP.get_response(URI(uri_str))

      case resulting
      when Net::HTTPSuccess then
        resulting
      when Net::HTTPRedirection then
        loc = resulting['location']
        warn "redirected to #{loc}"
        fetch(loc, limit - 1)
      else
        resulting.value
      end
    end

    def get_path_data(data = nil)
      original_path = data.presence || params[:path].presence || "root"
      path = original_path.split('/').first.to_sym

      data = (route_info[:links][path] || route_info[:links][:root] || {}).dup
      data = (route_info[:links][data[:to]] || route_info[:links][:root] || {}).dup if data[:alias]

      title = nil

      if data[:resource]
        regex = Regexp.new(path.to_s + "/(.*?)(\\/|\\?|$)")

        if matches = regex.match(original_path)
          id = matches[1]

          p "SHOULD FETCH: #{data[:api] && id}"

          if data[:api] && id
            resource = {}
            begin
              puts "FETCHING DATA"
              p "RESULT:", resulting = fetch(request.base_url + data[:api] + id)
              p "RESOURCE:", resource = JSON.parse(resulting).to_h.deep_stringify_keys
              p "ID:", id = resource[data[:method] || 'title']
              p "DONE FETCHING DATA"
            rescue
            end
          end
          title = data[:title].sub(/%RESOURCE%/, id)
        end

      end

      data[:title] = title.presence || data[:title]

      puts data

      data
    end

    def route_info
      @route_info ||= Rails.application.config.route_info
    end
end
