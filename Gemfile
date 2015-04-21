source 'https://rubygems.org'

ruby '2.2.0'

gem 'rails', '4.2.0'
gem 'sqlite3'


gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
gem 'font-awesome-rails', '~> 4.2.0.0'

gem 'angular-rails-templates'

gem 'settingslogic', '~> 2.0.9'

# gem 'turbolinks'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0', group: :doc

gem 'unicorn'

gem 'devise'

group :development do
  gem 'capistrano-rails'
  gem 'capistrano-rvm'
  gem 'capistrano-bundler', '~> 1.1.2'
  
  gem 'quiet_assets'
  # gem 'rack-mini-profiler'
  gem 'pry'
  gem 'better_errors'
  gem 'binding_of_caller'
end

group :test do
  gem 'capybara', '~> 2.4.3'
  gem 'database_cleaner', '~> 1.3.0'
  gem 'launchy', '~> 2.4.2'
  gem 'selenium-webdriver', "~> 2.43.0"
  gem 'shoulda-matchers'
  gem 'mongoid-rspec'
end

group :development, :test do
  # gem 'byebug'
  gem 'faker', '~> 1.4.3'
  gem 'web-console', '~> 2.0'
  gem 'spring'
  gem 'rspec-rails', '~> 3.1.0'
  gem 'factory_girl_rails', '~> 4.4.1'
  gem 'guard-rspec'
  gem 'spring-commands-rspec', '~> 1.0.2'
end

group :production do
  gem 'mysql2'
end

# Use CoffeeScript for .coffee assets and views
# gem 'coffee-rails', '~> 4.1.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'
