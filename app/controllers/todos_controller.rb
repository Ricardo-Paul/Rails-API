class TodosController < ApplicationController
  def index
    @todos = Todo.order("created_at DESC")
    render json: @todos
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      render json: { status: 'success', message: "todo saved", data: todo}
    else
      render json: {error: 'not saved'}
    end
  end

  def update
    todo = Todo.find(params[:id])
    todo.update_attributes(todo_params)
    render json: { status:"success", message:"Successfully updated", data: todo }
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy
    head :no_content, status: :ok
  end


  private
  def todo_params
    params.require(:todo).permit(:title, :done)
  end
end


# https://medium.com/@pamit/todo-list-building-a-react-app-with-rails-api-7a3027907665
# ./bin/webpack-dev-server
# 