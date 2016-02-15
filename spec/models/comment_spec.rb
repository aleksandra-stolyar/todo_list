require_relative '../rails_helper'

describe Comment, type: :model do

  subject { create :comment }
  # validations
  it {expect(subject).to validate_presence_of :body}

  # associations
  it {expect(subject).to have_many :attachments}
  it {expect(subject).to belong_to :task}

end
