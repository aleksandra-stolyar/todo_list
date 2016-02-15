require_relative '../rails_helper'

describe Attachment, type: :model do

  subject { create :attachment }
  # validations
  it {expect(subject).to validate_presence_of :attachment}

  # associations
  it {expect(subject).to belong_to :comment}

end
