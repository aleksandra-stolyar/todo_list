class TasksController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project, :shallow => true

  def index
    # binding.pry
    respond_with @tasks
  end

  def show
    # binding.pry
    respond_with @task
  end

  def create
    # binding.pry
    @task = @project.tasks.create(task_params)
    # redirect_to project_tasks_url(@project)
    respond_with @task
    # binding.pry
  end

  def update
    @task.update_attributes(task_params)
    respond_with @task
  end

  def destroy
    @task.destroy
    respond_with @task
  end

  # def done
  #   @task.done!
  #   render @task
  # end

  private

  def task_params
    params.require(:task).permit(:name, :deadline, :status, :rate, :project_id)
  end

end
