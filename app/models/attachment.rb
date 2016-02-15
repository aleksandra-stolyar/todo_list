class Attachment < ActiveRecord::Base
  belongs_to :comment
  mount_uploader :attachment, AttachmentUploader

  validates :attachment, presence: true

end
