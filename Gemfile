source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'

# envkey managed environment variables
# gem 'envkey'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.0'
# Use postgresql as the database for Active Record
gem 'pg'
gem 'aasm'
# Use Puma as the app server
gem 'puma', '~> 3.11'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'
gem 'devise'
gem 'activeadmin'

gem 'where_exists', github: 'SampsonCrowley/where_exists', ref: '7345edc0e6de9b39beab2d32d0da299da7d78a0b'

gem 'inky-rb', require: 'inky'
# Stylesheet inlining for email **
gem 'premailer-rails', '~> 1.9.7'
gem 'dkim'

# PDF creator and binary wrapper
# https://berislavbabic.com/send-pdf-attachments-from-rails-with-wickedpdf-and-actionmailer/
gem 'wicked_pdf', '~> 1.1.0'

gem 'icalendar', '~> 2.4', '>= 2.4.1'
gem 'rubyzip', '>= 1.2.1'
gem 'axlsx', git: 'https://github.com/randym/axlsx.git', ref: 'c8ac844'
gem 'axlsx_rails'
gem 'google-api-client'
gem 'jazz_fingers'
gem 'pry-rails'
group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'bullet'
  gem 'rack-mini-profiler'
  gem 'factory_bot_rails'
  gem 'rspec'
  gem 'rspec-rails'
  gem 'guard'
  gem 'guard-rspec'
  gem 'shoulda'
  gem 'brakeman'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end


# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
