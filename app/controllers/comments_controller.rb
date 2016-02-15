class CommentsController < ApplicationController
  load_and_authorize_resource :task
  load_and_authorize_resource through: :task, :shallow => true

  def create
    @comment = @task.comments.create(comment_params)
    if @comment.save
      render json: {comment: @comment, message: I18n.t('comment.create.success'), status: 201}
    else
      render json: {message: I18n.t('comment.create.error'), status: 400}
    end
  end

  def destroy
    @comment.destroy
    render json: {message: I18n.t('comment.delete'), status: 200}
  end

  def update
    if @comment.update_attributes(comment_params)
      render json: {message: I18n.t('comment.update.success'), status: 200}
    else
      render json: {message: I18n.t('comment.update.error'), status: 400}
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :task_id)
  end

end
