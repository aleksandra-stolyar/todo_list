class Attachment < ActiveRecord::Base
  belongs_to :comment
  mount_uploader :attachment, AttachmentUploader

end
