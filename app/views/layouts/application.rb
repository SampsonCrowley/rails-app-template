module Layouts
  class Application < ::Stache::Mustache::View
    def title
      path_data[:title] || "DefaultAppName"
    end

    def gschema
      %Q(
        <link rel="canonical" href="#{route_info[:domain]}#{path_data[:canonical]}">
        <meta itemprop="name" content="#{path_data[:title].presence || "DefaultAppName"}">
        <meta itemprop="description" content="#{path_data[:description]}">
        #{path_data[:image].present? ? %Q(<meta itemprop="image" content="#{route_info[:domain]}/#{path_data[:image]}">) : ''}
      ).html_safe
    end

    def ograph
      %Q(
        <meta property="og:url" content="#{route_info[:domain]}#{path_data[:canonical]}">
        <meta property="og:type" content="website">
        <meta property="og:title" content="#{path_data[:title].presence || "DefaultAppName"}">
        #{path_data[:image].present? ? %Q(<meta property="og:image" content="#{route_info[:domain]}/#{path_data[:image]}">) : ''}
        <meta property="og:description" content="#{path_data[:description]}">
        <meta property="og:site_name" content="DefaultAppName">
        <meta property="og:locale" content="en_US">
      ).html_safe
    end


    def twitter
      %Q(
        <meta name="twitter:card" content="summary">
        <meta name="twitter:url" content="#{route_info[:domain]}#{path_data[:canonical]}">
        <meta name="twitter:title" content="#{path_data[:title].presence || "DefaultAppName"}">
        <meta name="twitter:description" content="#{path_data[:description]}">
        #{path_data[:image].present? ? %Q(<meta name="twitter:image" content="#{route_info[:domain]}/#{path_data[:image]}">) : ''}
      )
    end

    private

      def path_data
        @path_data ||= get_path_data
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

      def get_path_data
        path = (params[:path].presence || "root").split('/').first.to_sym

        data = (route_info[:links][path] || route_info[:links][:root] || {}).dup
        data = (route_info[:links][data[:to]] || route_info[:links][:root] || {}).dup if data[:alias]

        title = nil

        if data[:resource]
          regex = Regexp.new(path.to_s + "/(.*?)(\\/|\\?|$)")

          p regex

          if matches = regex.match(params[:path])
            p id = matches[1]

            if data[:api] && id
              resource = {}
              begin
                p resulting = fetch(request.base_url + data[:api] + id)
                p resource = JSON.parse(resulting).to_h.deep_stringify_keys
                p id = resource[data[:method] || 'title']
              rescue
              end
            end
            title = data[:title].sub(/%RESOURCE%/, id)
          end

        end

        data[:title] = title || data[:title]

        data
      end

      def route_info
        @route_info ||= Rails.application.config.route_info
      end
  end
end
