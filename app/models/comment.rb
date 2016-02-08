class Comment < ActiveRecord::Base
  belongs_to :task

  has_many :attachments, dependent: :destroy

  validates :body, presence: true
end
