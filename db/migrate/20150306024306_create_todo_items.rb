class CreateTodoItems < ActiveRecord::Migration
  def change
    create_table :todo_items do |t|
      t.text :title

      t.timestamps null: false
    end
  end
end
