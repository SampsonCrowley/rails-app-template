require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module DefaultAppName
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2
    # config.time_zone = 'Mountain Time (US & Canada)'
    config.active_record.default_timezone = :utc
    config.eager_load_paths += Dir["#{config.root}/lib/modules/**/"]
    # uncomment line below to split routes into multiple files
    # config.autoload_paths += %W(#{config.root}/config/routes)
    config.active_record.schema_format = :sql
    config.active_job.queue_adapter = :sidekiq
    config.generators do |g|
      g.assets false
    end

    base_path = Rails.root.join('public')

    unparsed = (File.exist?(base_path.join('routes.json')) ? JSON.parse(File.read(base_path.join('routes.json'))) : {}).to_h.deep_symbolize_keys

    config.route_info = {
      domain: unparsed[:domain].presence || 'https://lvh.me',
      links: unparsed[:links].presence || {}
    }

    unparsed = (File.exist?(base_path.join('asset-manifest.json')) ? JSON.parse(File.read(base_path.join('asset-manifest.json'))) : {}).to_h.deep_symbolize_keys
    config.route_info[:manifest] = (unparsed.presence || {}).deep_stringify_keys

    unparsed = {}

    config.route_info[:manifest].each do |k, v|
      unparsed[k.sub(/static\/.*?\//, '')] = v
    end

    config.route_info[:manifest].merge! unparsed

    config.route_info[:links].each do |route, info|
      info[:image] = unparsed[info[:image]] || info[:image] if info[:image].present?
    end

    config.action_mailer.preview_path = "#{Rails.root}/spec/mailers/previews"
    config.action_mailer.default_url_options = {
      :host => config.route_info[:domain]
    }
    Rails.application.routes.default_url_options[:host] = config.route_info[:domain]

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
    config.app_generators.scaffold_controller = :scaffold_controller

    # Middleware for ActiveAdmin
    config.middleware.use Rack::MethodOverride
    config.middleware.use ActionDispatch::Flash
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
  end
end
