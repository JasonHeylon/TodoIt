class Todo < ActiveRecord::Base
	belongs_to :cookie_user

	def is_completed
		!completed_at.nil?
	end
end
