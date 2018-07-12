Rails.application.routes.draw do
  root "application#fallback_index_html"
  require 'sidekiq/web'
  require 'sidekiq-status/web'
  mount Sidekiq::Web => '/sidekiq'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  namespace :api do
    resources :appointments
    resources :developers
    resources :tasks
  end

  get '*path', to: "application#serve_asset", constraints: ->(request) do
    !request.xhr? && !request.format.html?
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
