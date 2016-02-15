require_relative '../rails_helper'

describe Project, type: :model do
  subject { create :project }
  # validations
  it {expect(subject).to validate_presence_of :name}

  # associations
  it {expect(subject).to have_many :tasks}
  it {expect(subject).to belong_to :user}

  it "should have projects in the right order" do
    @new_project = Project.create(name: "new_project")
    expect(Project.all.ordered).to be == [@new_project, subject]
  end

end
