class AddCookieUserToTodos < ActiveRecord::Migration
  def change
    add_reference :todos, :cookie_user
  end
end
