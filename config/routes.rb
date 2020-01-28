Rails.application.routes.draw do
    root to: 'static#index'
    scope '/api/v1' do 
        resources :todos
    end
end
