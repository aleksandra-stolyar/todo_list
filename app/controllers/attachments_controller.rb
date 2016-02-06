class AttachmentsController < ApplicationController
  load_and_authorize_resource :comment
  load_and_authorize_resource through: :comment, shallow: true

  def create
    @attachment = @comment.attachments.create!(attachment_params)
    @attachment.reload
    render json: @attachment
  end

  private

  def attachment_params
    params.permit(:attachment, :filename, :comment_id)
  end
end
