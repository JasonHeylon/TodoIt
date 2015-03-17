class AddTitleAndCompletedDateToTodos < ActiveRecord::Migration
  def change
    add_column :todos, :title, :string
    add_column :todos, :completed_at, :datetime
  end
end
