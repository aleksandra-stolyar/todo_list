class TasksController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project, :shallow => true

  def create
    @task = @project.tasks.create(task_params)
    render json: @task
  end

  def update
    @task.update_attributes(task_params)
    render nothing: true, status: 204
  end

  def destroy
    @task.destroy
    render nothing: true, status: 204
  end

  def set_status
    @task.change_status
    render json: @task
  end

  private

  def task_params
    params.require(:task).permit(:name, :deadline, :status, :rate, :project_id)
  end

end
