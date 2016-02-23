FactoryGirl.define do
  factory :project do
    name { Faker::Lorem.word }
    created_at 1.week.ago
    user
  end
end
