class Project < ActiveRecord::Base
  belongs_to :user
  has_many :tasks, dependent: :destroy

  validates :name, presence: true
  scope :ordered, -> { order('created_at ASC') }

  def as_json(options = {})
    super(options.merge(include: :tasks))
  end
end
