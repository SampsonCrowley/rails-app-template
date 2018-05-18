if ENV['DKIM_PATH'] && File.exists?(ENV['DKIM_PATH'])
  Dkim::domain      = 'default_app_name.com'
  Dkim::selector    = `hostname`.strip.to_sym
  Dkim::private_key = File.read(ENV['DKIM_PATH'])
  # This will sign all ActionMailer deliveries
  ActionMailer::Base.register_interceptor(Dkim::Interceptor)
end
