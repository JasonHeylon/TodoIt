class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :get_or_set_cookie, unless: :user_signed_in?

  before_action :config_permitted_parameters, if: :devise_controller?


  protected 
	  def get_or_set_cookie

	  	if cookies[:cookie_user]
	  		@cookie_user = CookieUser.find_by(cookie_id: cookies[:cookie_user])
	  	else
	  		@cookie_user = CookieUser.get_new
	  		cookies[:cookie_user] = {
	  			value: @cookie_user.cookie_id,
	  			expires: 99.years.from_now
	  		}
	  	end

	  end

	  def config_permitted_parameters
	  	devise_parameter_sanitizer.for(:sign_up) << :user_name
	  	
	  end

end
