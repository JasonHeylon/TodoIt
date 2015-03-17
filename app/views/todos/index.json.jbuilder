json.array!(@todos) do |todo|
  json.extract! todo, :id, :is_completed, :title, :created_at, :completed_at
  json.url todo_url(todo, format: :json)
end
