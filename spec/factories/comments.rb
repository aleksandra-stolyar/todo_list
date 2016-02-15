FactoryGirl.define do
  factory :comment do
    body {Faker::Lorem.sentence}
    task
  end
end
