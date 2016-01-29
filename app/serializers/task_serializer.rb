class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :deadline, :rate, :status

  has_many :comments
end
