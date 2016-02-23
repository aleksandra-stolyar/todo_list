require_relative '../rails_helper'

describe TasksController, type: :controller do
  include Devise::TestHelpers

  let(:user){ create(:user) }
  let(:ability){ Ability.new(user) }

  let(:project){ create(:project, user: user) }
  let(:task){ create(:task, project: project) }
  let(:task_attributes){ attributes_for(:task) }

  before(:each) do
    allow(controller).to receive(:current_ability).and_return(ability)
    sign_in user
  end

  describe "POST #create" do
    context "without ability" do
      before(:each) do
        ability.cannot :create, Task
        post :create, name: task.name, project_id: project.id
      end

      it { is_expected.to redirect_to(root_path) }
    end

    context "with valid attributes" do
      before(:each) do
        ability.can :create, Task
        post :create, format: :json, name: task.name, project_id: project.id
      end

      it "assigns @task" do
        expect(assigns(:task)).not_to be_nil
      end

      it "saves task" do
        expect {
          post :create, name: task.name, project_id: project.id
        }.to change(Task, :count).by(1)
      end

      it "throws success message" do
        expect(body['message']).to eq(I18n.t('task.create.success'))
      end
    end

    context "with forbidden attributes" do
      before(:each) do
        ability.can :create, Task
        post :create, name: nil, project_id: project.id
      end

      it "throws error message" do
        expect(body['message']).to eq(I18n.t('task.create.error'))
      end
    end

  end

  describe "PUT #update" do
    context "without ability" do
      before(:each) do
        ability.cannot :update, Task
        put :update, id: task.id, name: "new name"
      end

      it { is_expected.to redirect_to(root_path) }
    end

    context "with valid attributes" do
      before(:each) do
        ability.can :update, Task
        put :update, id: task.id, name: "new name"
      end

      it "assigns @task" do
        expect(assigns(:task)).not_to be_nil
      end

      it "saves task" do
        task.reload
        expect(task.name).to eq("new name")
      end

      it "throws success message" do
        expect(body['message']).to eq(I18n.t('task.update.success'))
      end

    end

    context "with forbidden attributes" do
      before(:each) do
        ability.can :update, Task
        put :update, id: task.id, name: nil
      end

      it "throws error message" do
        expect(body['message']).to eq(I18n.t('task.update.error'))
      end
    end

  end

  describe "DELETE #destroy" do
    context "without ability" do
      before(:each) do
        ability.cannot :destroy, Task
        delete :destroy, format: :json,  id: task.id
      end
      it { is_expected.to redirect_to(root_path) }
    end

    context "when deletes" do
      before(:each) do
        ability.can :destroy, Task
        task
      end

      it "deletes task" do
        expect {
          delete :destroy, id: task.id
        }.to change(Task, :count).by(-1)
      end

      it "throws message" do
        delete :destroy, id: task.id
        expect(body['message']).to eq(I18n.t('task.delete'))
      end

    end
  end

  def body
    JSON.parse(response.body)
  end

end
