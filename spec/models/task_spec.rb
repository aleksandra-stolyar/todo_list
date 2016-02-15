require_relative '../rails_helper'

describe Task, type: :model do
  subject { create :task }
  # validations
  it {expect(subject).to validate_presence_of :name}

  # associations
  it {expect(subject).to have_many :comments}
  it {expect(subject).to belong_to :project}

  #state machine

  it {expect(subject).to transition_from(:completed).to(:in_progress).on_event(:start)}

  it 'change state to the opposite' do
    subject.change_status
    expect(subject.status).to be == 'completed'
  end

end
