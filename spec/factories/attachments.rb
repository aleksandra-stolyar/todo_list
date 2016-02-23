FactoryGirl.define do
  factory :attachment do
    filename { Faker::Lorem.word }
    attachment { Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec', 'fixtures', 'images', 'example_image.jpg')) }
    comment
  end
end
