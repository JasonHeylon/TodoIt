class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :edit, :update, :destroy, :mark_complete, :mark_uncomplete]
  before_action :check_user, only: [:update, :destroy, :mark_complete, :mark_uncomplete]

  # GET /todos
  # GET /todos.json
  def index
    # @todos = Todo.all
    if user_signed_in?
      @user = current_user
    else
      @user = @cookie_user
    end

    date_start, date_end = Date.tomorrow.strftime("%Y-%m-%d"), DateTime.now.strftime("%Y-%m-%d")
    date_start = date_end = params[:date] if params[:date]
    
    @todos = @user.todos.where("(DATE(created_at) <= ? AND completed_at IS NULL) OR DATE(completed_at) = ?",
                               date_start, date_end)


  end

  # GET /todos/1
  # GET /todos/1.json
  def show
  end

  # GET /todos/new
  def new
    @todo = Todo.new
  end

  # GET /todos/1/edit
  def edit
  end

  # POST /todos
  # POST /todos.json
  def create
    if user_signed_in?
      @todo = current_user.todos.new(todo_params)
    else
      @todo = @cookie_user.todos.new(todo_params)
    end

    respond_to do |format|
      if @todo.save
        format.html { redirect_to @todo, notice: 'Todo was successfully created.' }
        format.json { render :show, status: :created, location: @todo }
      else
        format.html { render :new }
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /todos/1
  # PATCH/PUT /todos/1.json
  def update
    respond_to do |format|
      if @todo.update(todo_params)
        format.html { redirect_to @todo, notice: 'Todo was successfully updated.' }
        format.json { render :show, status: :ok, location: @todo }
      else
        format.html { render :edit }
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /todos/1
  # DELETE /todos/1.json
  def destroy
    @todo.destroy
    respond_to do |format|
      format.html { redirect_to todos_url, notice: 'Todo was successfully destroyed.' }
      format.json { head :no_content}
    end
  end

  def mark_complete
  	@todo.completed_at = DateTime.now
    respond_to do |format|
    	if @todo.save
        format.html { redirect_to @todo, notice: 'Todo was successfully updated.' }
        format.json { render :show, status: :ok, location: @todo }
      else
        format.html { render :edit }
        format.json { render json: @todo.errors, status: :unprocessable_entity }
    	end
    end
  end

  def mark_uncomplete
    @todo.completed_at = nil;
    respond_to do |format|
      if @todo.save
        format.html { redirect_to @todo, notice: 'Todo was successfully updated.' }
        format.json { render :show, status: :ok, location: @todo }
      else
        format.html { render :edit }
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_params
      params.require(:todo).permit([:title, :completed_at])
    end

    def check_user
      if user_signed_in?
        current_user == @todo.user
      else
        @cookie_user.cookie_id == @todo.cookie_user.cookie_id
      end
    end
end
