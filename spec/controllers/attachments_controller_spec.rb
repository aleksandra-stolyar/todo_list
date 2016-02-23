require_relative '../rails_helper'

describe AttachmentsController, type: :controller do
  include Devise::TestHelpers

  let(:user){ create(:user) }
  let(:ability){ Ability.new(user) }

  let(:project){ create(:project, user: user) }
  let(:task){ create(:task, project: project) }
  let(:comment){ create(:comment, task: task) }
  let(:attachment){ create(:attachment, comment: comment) }
  let(:file) { fixture_file_upload('images/example_image.jpg', 'image/jpg') }

  before(:each) do
    allow(controller).to receive(:current_ability).and_return(ability)
    sign_in user
  end

  describe "POST #create" do
    context "without ability" do
      before(:each) do
        ability.cannot :create, Attachment
        post :create,
        attachment: file, filename: attachment.filename, comment_id: comment.id
      end

      it { is_expected.to redirect_to(root_path) }
    end

    context "with ability" do
      before(:each) do
        ability.can :create, Attachment
        post :create,
        attachment: file, filename: attachment.filename, comment_id: comment.id
      end

      it "assigns @attachment" do
        expect(assigns(:attachment)).not_to be_nil
      end

      it "saves attachment" do
        expect {
          post :create,
          attachment: file, filename: attachment.filename, comment_id: comment.id
        }.to change(Attachment, :count).by(1)
      end

      it "throws success message" do
        expect(body['message']).to eq(I18n.t('attachment.create'))
      end
    end

  end

  def body
    JSON.parse(response.body)
  end

end
