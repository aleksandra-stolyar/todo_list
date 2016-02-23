class ProjectsController < ApplicationController
  load_and_authorize_resource :project

  def index
    render json: @projects.ordered
  end

  def create
    @project = current_user.projects.create(project_params)
    if @project.save
      render json: {project: @project, message: I18n.t('project.create.success'), status: 201}
    else
      render json: {message: I18n.t('project.create.error'), status: 400}
    end
  end

  def update
    if @project.update_attributes(project_params)
      render json: {message: I18n.t('project.update.success'), status: 200}
    else
      render json: {message: I18n.t('project.update.error'), status: 400}
    end
  end

  def destroy
    @project.destroy
    render json: {message: I18n.t('project.delete'), status: 200}
  end

  def save_sort
    params[:taskIds].each_with_index do |task_id, index|
      task = Task.find(task_id)
      task.rate = index
      task.project_id = params[:project_id]
      task.save!
    end
    render json: {message: I18n.t('task.priority'), status: 200 }
  end

  private

  def project_params
    params.permit(:name)
  end

end
