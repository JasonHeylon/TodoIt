class CookieUser < ActiveRecord::Base

	has_many :todos

	def self.get_new
		CookieUser.create(cookie_id: Digest::SHA1.hexdigest([Time.now, Settings.cookie_user_token_base].join))
	end
end
