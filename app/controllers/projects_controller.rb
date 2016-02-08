class ProjectsController < ApplicationController
  load_and_authorize_resource :project

  def index
    render json: @projects.ordered
  end

  def create
    @project = current_user.projects.create(project_params)
    render json: @project
  end

  def update
    @project.update_attributes(project_params)
    render nothing: true, status: 204
  end

  def destroy
    @project.destroy

    render nothing: true, status: 204
  end

  def save_sort
    params[:taskIds].each_with_index do |task_id, index|
      task = Task.find(task_id)
      task.rate = index
      task.project_id = params[:project_id]
      task.save!
    end
    render nothing: true
  end

  private

  def api_response(object, code = :ok)
    render json: object.to_json, status: code
  end

  def project_params
    params.require(:project).permit(:name)
  end

end
