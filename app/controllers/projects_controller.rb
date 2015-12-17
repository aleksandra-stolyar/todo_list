class ProjectsController < ApplicationController
  load_and_authorize_resource :project

  def index
    respond_with @projects
  end

  def show
    respond_with @project
  end

  def create
    @project = Project.create(project_params)
    respond_with @project
  end

  def update
    @project.update_attributes(project_params)
    respond_with @project
  end

  def destroy
    @project.destroy

    respond_with @project
  end

  # def new_untitled
  #   @project = current_user.projects.new(name: 'Untitled')
  #   if @project.save
  #     render @project
  #   else
  #     render text: @project.errors.full_messages.join("\n"), status: :error
  #   end
  # end

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
