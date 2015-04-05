class CreateCookieUsers < ActiveRecord::Migration
  def change
    create_table :cookie_users do |t|
      t.string :cookie_id

      t.timestamps null: false
    end

    add_index :cookie_users, :cookie_id
  end
end
