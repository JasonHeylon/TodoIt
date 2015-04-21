class AddUserToTodos < ActiveRecord::Migration
  def change
    add_reference :todos, :user, index: true
    add_foreign_key :todos, :users
  end
end
