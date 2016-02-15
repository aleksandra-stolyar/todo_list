FactoryGirl.define do
  factory :project do
    name { Faker::Name.name }
    created_at 1.week.ago
    user
  end
end
