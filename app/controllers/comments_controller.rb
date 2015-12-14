class CommentsController < ApplicationController
  load_and_authorize_resource :task
  load_and_authorize_resource through: :task, :shallow => true

  def create
    @comment = @task.comments.create(comment_params)
    respond_with @comment
  end

  def destroy
    @comment.destroy
    respond_with @comment
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :task_id)
  end


end
