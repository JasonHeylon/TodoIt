require 'rails_helper'

RSpec.describe "todos/edit", :type => :view do
  before(:each) do
    @todo = assign(:todo, Todo.create!())
  end

  it "renders the edit todo form" do
    render

    assert_select "form[action=?][method=?]", todo_path(@todo), "post" do
    end
  end
end
