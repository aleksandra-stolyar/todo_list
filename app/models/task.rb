class Task < ActiveRecord::Base
  enum status: { in_progress: 0, completed:1 }
  belongs_to :project

  validates :name, presence: true

  include AASM

  aasm :column => :status, :enum => true do
    state :in_progress, :initial => true
    state :completed

    event :complete do
      transitions :from => :in_progress, :to => :completed
    end

    event :start do
      transitions :from => :completed, :to => :in_progress
    end
  end

end
