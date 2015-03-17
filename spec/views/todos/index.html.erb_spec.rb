require 'rails_helper'

RSpec.describe "todos/index", :type => :view do
  before(:each) do
    assign(:todos, [
      Todo.create!(),
      Todo.create!()
    ])
  end

  it "renders a list of todos" do
    render
  end
end
