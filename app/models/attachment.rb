class Attachment < ActiveRecord::Base
  belongs_to :comment
  mount_uploaders :attachments, AttachmentUploader

end
