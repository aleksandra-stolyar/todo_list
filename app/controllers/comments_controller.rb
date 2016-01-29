class CommentsController < ApplicationController
  load_and_authorize_resource :task
  load_and_authorize_resource through: :task, :shallow => true

  def create
    @comment = @task.comments.create(comment_params)
    render json: @comment
  end

  def destroy
    @comment.destroy
    render nothing: true, status: 204
  end

  def update
    @comment.update_attributes(comment_params)
    render nothing: true, status: 204
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :task_id)
  end

end
