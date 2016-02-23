FactoryGirl.define do
  factory :task do
    name { Faker::Lorem.word }
    deadline { Faker::Date.forward(23) }
    rate 1
    status "in_progress"
    project
  end
end
