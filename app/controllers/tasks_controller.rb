class TaskController < ApplicationController
  # load_and_authorize_resource :project
  # load_and_authorize_resource through: :project

  # def create
  #   @task = @project.tasks.new(task_params)
  #   if @task.save
  #     render @task
  #   else
  #     render text: @task.errors.full_messages.join("\n"), status: :error
  #   end
  # end

  # def update
  #   @task.update_attributes(task_params)
  #   render json: @task
  # end

  # def delete
  # end

  # def destroy
  #   @task.destroy
  #   render nothing: true, status: :ok
  # end

  # def find_project
  #   @project = Project.find(params[:project_id])
  # end

  # def find_task
  #   @task = Task.find(params[:id])
  # end

  # def done
  #   @task.done!
  #   render @task
  # end

  # def task_params
  #   params.require(:task).permit(:name, :rate, :deadline, :done)
  # end  

end
