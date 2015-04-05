# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150331151308) do

  create_table "cookie_users", force: :cascade do |t|
    t.string   "cookie_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "cookie_users", ["cookie_id"], name: "index_cookie_users_on_cookie_id"

  create_table "todos", force: :cascade do |t|
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "title"
    t.datetime "completed_at"
    t.integer  "cookie_user_id"
  end

end
