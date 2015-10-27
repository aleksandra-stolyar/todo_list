class ProjectController < ApplicationController
  # before_action :authenticate_user!
  # before_filter :find_project, only: [:show, :edit, :update, :destroy]

  # def index
  #   @projects = current_user.projects.ordered
  # end

  # def show
  # end

  # def edit
  # end

  # def update
  #   @project.update_attributes(project_params)
  #   render json: @project
  # end

  # def delete
  # end

  # def destroy
  #   @project.destroy
  #   render nothing: true, status: :ok
  # end

  # def new_untitled
  #   @project = current_user.projects.new(name: 'Untitled')
  #   if @project.save
  #     render @project
  #   else
  #     render text: @project.errors.full_messages.join("\n"), status: :error      
  #   end
  # end

  # def save_sort
  #   params[:taskIds].each_with_index do |task_id, index|
  #     task = Task.find(task_id)
  #     task.rate = index
  #     task.save!
  #   end
  #   render nothing: true
  # end

  # def project_params
  #   params.require(:project).permit(:name)
  # end

end
