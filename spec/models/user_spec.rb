require_relative '../rails_helper'
require 'cancan/matchers'

describe User, type: :model do
  subject { create :user }
  # validations
  it {expect(subject).to validate_presence_of :email}
  it {expect(subject).to validate_presence_of :password}

  it {expect(subject).to validate_uniqueness_of(:email).case_insensitive}

  # associations
  it {expect(subject).to have_many :projects}

  #abilities
  describe "abilities" do
    let(:ability){ Ability.new(user) }

    context "when not logged in" do
      let(:user){ nil }
      it {expect(ability).not_to be_able_to(:read, Project)}
      it {expect(ability).not_to be_able_to(:create, Project)}

      it {expect(ability).not_to be_able_to(:read, Task)}
      it {expect(ability).not_to be_able_to(:create, Task)}

      it {expect(ability).not_to be_able_to(:manage, Comment)}
      it {expect(ability).not_to be_able_to(:delete, Comment)}

      it {expect(ability).not_to be_able_to(:manage, Attachment)}
    end

    context "access to owned items" do
      let(:user){ create :user }
      let(:project){ create(:project, user: user) }
      let(:task){create(:task, project: project)}
      let(:comment){create(:comment, task: task)}

      it {expect(ability).to be_able_to(:index, project)}
      it {expect(ability).to be_able_to(:create, project)}
      it {expect(ability).to be_able_to(:destroy, project)}
      it {expect(ability).to be_able_to(:update, project)}
      it {expect(ability).to be_able_to(:update, Task.new(project: project))}
      it {expect(ability).to be_able_to(:set_status, Task.new(project: project))}
      it {expect(ability).to be_able_to(:create, comment)}
      it {expect(ability).to be_able_to(:destroy, comment)}
      it {expect(ability).to be_able_to(:update, comment)}
    end

    context "access to another user's items" do
      let(:user){ create :user }
      let(:alien){ create :user }
      let(:alien_project){ create(:project, user: alien) }
      let(:alien_task){create(:task, project: alien_project)}

      it {expect(ability).not_to be_able_to(:destroy, alien_project)}
      it {expect(ability).not_to be_able_to(:update, alien_project)}
      it {expect(ability).not_to be_able_to(:destroy, alien_task)}
    end
  end

end
