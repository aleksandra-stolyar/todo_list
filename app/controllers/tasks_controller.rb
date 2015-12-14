class TasksController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project, :shallow => true

  def create
    @task = @project.tasks.create(task_params)
    respond_with @task
  end

  def update
    @task.update_attributes(task_params)
    respond_with @task
  end

  def destroy
    @task.destroy
    respond_with @task
  end

  private

  def task_params
    params.require(:task).permit(:name, :deadline, :status, :rate, :project_id)
  end

end
