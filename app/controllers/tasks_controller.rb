class TasksController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project, :shallow => true

  def create
    @task = @project.tasks.create(task_params)
    if @task.save
      render json: {task: @task, message: I18n.t('task.create.success'), status: 201}
    else
      render json: {message: I18n.t('task.create.error'), status: 400}
    end
  end

  def update
    if @task.update_attributes(task_params)
      render json: {message: I18n.t('task.update.success'), status: 200}
    else
      render json: {message: I18n.t('task.update.error'), status: 400}
    end
  end

  def destroy
    @task.destroy
    render json: {message: I18n.t('task.delete'), status: 200}
  end

  def set_status
    @task.change_status
    render json: {task: @task, message: I18n.t('task.status'), status: 201}
  end

  private

  def task_params
    params.require(:task).permit(:name, :deadline, :status, :rate, :project_id)
  end

end
