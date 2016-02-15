class Comment < ActiveRecord::Base
  belongs_to :task

  has_many :attachments, dependent: :destroy

  validates :body, presence: true

  def as_json(options = {})
    super(options.merge(include: :attachments))
  end
end
