class Todo < ActiveRecord::Base
	def is_completed
		!completed_at.nil?
	end
end
