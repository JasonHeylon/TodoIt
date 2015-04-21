class MembersController < ApplicationController

	before_action :authenticate_user!, only: [:merge_data]

  def current
  	if user_signed_in?
  		@user = current_user
  	else
  		render json: nil, status: :ok
  	end
  end

  def check_needs_merge
		@cookie_user = CookieUser.find_by(cookie_id: cookies[:cookie_user])
		if @cookie_user && @cookie_user.todos.any?
			render json: true, status: :ok
		else
			render json: nil, status: :ok
		end
  end


  def merge_data
		@cookie_user = CookieUser.find_by(cookie_id: cookies[:cookie_user])
		if @cookie_user && @cookie_user.todos.any? && @cookie_user.todos.update_all(user_id: current_user.id)
			clear_cookie
			render json: true, status: :ok
		else
			render json: nil, status: :ok
		end
		
  end


  private
  	def clear_cookie
	  	if cookies[:cookie_user]
	  		cookies.delete :cookie_user
	  	end
  		
  	end

end
