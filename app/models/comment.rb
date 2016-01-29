class Comment < ActiveRecord::Base
  belongs_to :task

  has_many :attachments, dependent: :destroy
  # mount_uploaders :attachments, AttachmentUploader


  # def as_json(options = {})
  #   super(options.merge(include: :attachments))
  # end

end
