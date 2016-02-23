require_relative '../rails_helper'

describe ProjectsController, type: :controller do
  include Devise::TestHelpers

  let(:user){ create(:user) }
  let(:ability){ Ability.new(user) }

  let(:project){ create(:project, user: user) }
  let(:project_attributes){ attributes_for(:project) }

  before(:each) do
    allow(controller).to receive(:current_user).and_return(user)
    allow(controller).to receive(:current_ability).and_return(ability)
    sign_in user
  end

  describe "GET #index" do
    context "without ability" do
      before(:each) do
        ability.cannot :index, Project
        get :index
      end

      it "redirects to root after CanCan::AccessDenied" do
        expect(response).to redirect_to(root_path)
      end
    end

    context "with necessary ability" do
      before(:each) do
        ability.can :index, Project
        get :index
      end

      it "assigns @projects" do
        expect(assigns(:projects)).not_to be_nil
      end
    end
  end

  describe "POST #create" do
    context "without ability" do
      before(:each) do
        ability.cannot :create, Project
        post :create, name: project.name
      end

      it { is_expected.to redirect_to(root_path) }
    end

    context "with valid attributes" do
      before(:each) do
        ability.can :create, Project
        post :create, format: :json, name: project.name
      end

      it "assigns @project" do
        expect(assigns(:project)).not_to be_nil
      end

      it "saves project" do
        expect {
          post :create, name: project.name
        }.to change(Project, :count).by(1)
      end

      it "throws success message" do
        expect(body['message']).to eq(I18n.t('project.create.success'))
      end
    end

    context "with forbidden attributes" do
      before(:each) do
        ability.can :create, Project
        post :create, name: nil
      end

      it "throws error message" do
        expect(body['message']).to eq(I18n.t('project.create.error'))
      end
    end

  end

  describe "PUT #update" do
    context "without ability" do
      before(:each) do
        ability.cannot :update, Project
        put :update, id: project.id, name: "new name"
      end

      it { is_expected.to redirect_to(root_path) }
    end

    context "with valid attributes" do
      before(:each) do
        ability.can :update, Project
        put :update, id: project.id, name: "new name"
      end

      it "assigns @project" do
        expect(assigns(:project)).not_to be_nil
      end

      it "saves project" do
        project.reload
        expect(project.name).to eq("new name")
      end

      it "throws success message" do
        expect(body['message']).to eq(I18n.t('project.update.success'))
      end

    end

    context "with forbidden attributes" do
      before(:each) do
        ability.can :update, Project
        put :update, id: project.id, name: nil
      end

      it "throws error message" do
        expect(body['message']).to eq(I18n.t('project.update.error'))
      end
    end

  end

  describe "DELETE #destroy" do
    context "without ability" do
      before(:each) do
        ability.cannot :destroy, Project
        delete :destroy, format: :json,  id: project.id
      end
      it { is_expected.to redirect_to(root_path) }
    end

    context "when deletes" do
      before(:each) do
        ability.can :destroy, Project
        project
      end

      it "deletes project" do
        expect {
          delete :destroy, id: project.id
        }.to change(Project, :count).by(-1)
      end

      it "throws message" do
        delete :destroy, id: project.id
        expect(body['message']).to eq(I18n.t('project.delete'))
      end

    end

  end

  def body
    JSON.parse(response.body)
  end

end
