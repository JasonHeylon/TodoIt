require 'rails_helper'

RSpec.describe "todos/show", :type => :view do
  before(:each) do
    @todo = assign(:todo, Todo.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
