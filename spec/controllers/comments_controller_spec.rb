require_relative '../rails_helper'

describe CommentsController, type: :controller do
  include Devise::TestHelpers

  let(:user){ create(:user) }
  let(:ability){ Ability.new(user) }

  let(:project){ create(:project, user: user) }
  let(:task){ create(:task, project: project) }
  let(:comment){ create(:comment, task: task) }
  let(:comment_attributes){ attributes_for(:comment) }

  before(:each) do
    allow(controller).to receive(:current_ability).and_return(ability)
    sign_in user
  end

  describe "POST #create" do
    context "without ability" do
      before(:each) do
        ability.cannot :create, Comment
        post :create, body: comment.body, task_id: task.id
      end

      it { is_expected.to redirect_to(root_path) }
    end

    context "with valid attributes" do
      before(:each) do
        ability.can :create, Comment
        post :create, format: :json, body: comment.body, task_id: task.id
      end

      it "assigns @comment" do
        expect(assigns(:comment)).not_to be_nil
      end

      it "saves comment" do
        expect {
          post :create, body: comment.body, task_id: task.id
        }.to change(Comment, :count).by(1)
      end

      it "throws success message" do
        expect(body['message']).to eq(I18n.t('comment.create.success'))
      end
    end

    context "with forbidden attributes" do
      before(:each) do
        ability.can :create, Comment
        post :create, body: nil, task_id: task.id
      end

      it "throws error message" do
        expect(body['message']).to eq(I18n.t('comment.create.error'))
      end
    end

  end

  describe "PUT #update" do
    context "without ability" do
      before(:each) do
        ability.cannot :update, Comment
        put :update, id: comment.id, body: "new comment"
      end

      it { is_expected.to redirect_to(root_path) }
    end

    context "with valid attributes" do
      before(:each) do
        ability.can :update, Comment
        put :update, id: comment.id, body: "new comment"
      end

      it "assigns @comment" do
        expect(assigns(:comment)).not_to be_nil
      end

      it "saves comment" do
        comment.reload
        expect(comment.body).to eq("new comment")
      end

      it "throws success message" do
        expect(body['message']).to eq(I18n.t('comment.update.success'))
      end

    end

    context "with forbidden attributes" do
      before(:each) do
        ability.can :update, Comment
        put :update, id: comment.id, body: nil
      end

      it "throws error message" do
        expect(body['message']).to eq(I18n.t('comment.update.error'))
      end
    end

  end

  describe "DELETE #destroy" do
    context "without ability" do
      before(:each) do
        ability.cannot :destroy, Comment
        delete :destroy, format: :json,  id: comment.id
      end
      it { is_expected.to redirect_to(root_path) }
    end

    context "when deletes" do
      before(:each) do
        ability.can :destroy, Comment
        comment
      end

      it "deletes comment" do
        expect {
          delete :destroy, id: comment.id
        }.to change(Comment, :count).by(-1)
      end

      it "throws message" do
        delete :destroy, id: comment.id
        expect(body['message']).to eq(I18n.t('comment.delete'))
      end

    end
  end

  def body
    JSON.parse(response.body)
  end

end
