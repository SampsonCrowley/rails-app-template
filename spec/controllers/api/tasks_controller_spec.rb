require 'rails_helper'

RSpec.describe API::TasksController, type: :controller do
  # This should return the minimal set of attributes required to create a valid
  # Task. As you add validations to Task, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    {
      title: 'New Task',
      due_date: Date.tomorrow,
      developer_id: create(:developer).id
    }
  }

  let(:invalid_attributes) {
    {
      description: 'description without title',
      due_date: Date.yesterday,
    }
  }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # TasksController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET #index" do
    it "returns a success response" do
      task = Task.create! valid_attributes
      get :index, params: {}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      task = Task.create! valid_attributes
      get :show, params: {id: task.to_param}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Task" do

        expect {
          post :create, params: {task: valid_attributes}, session: valid_session
        }.to change(Task, :count).by(1)
      end

      it "renders a JSON response with the new task" do

        post :create, params: {task: valid_attributes}, session: valid_session
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json')
        expect(response.location).to eq(api_task_url(Task.last))
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the new task" do

        post :create, params: {task: invalid_attributes}, session: valid_session
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json')
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:second_dev) {
        dev = build(:developer)
        dev.email = "new_email_#{Time.now.to_s}@test.test"
        dev.save
        dev
      }
      let(:new_attributes) {
        {
          title: 'Updated Task',
          description: 'Added Description',
          due_date: 15.days.from_now,
          developer_id: second_dev.id
        }
      }

      it "updates the requested task" do
        task = Task.create! valid_attributes
        put :update, params: {id: task.to_param, task: new_attributes}, session: valid_session
        task.reload
        new_attributes.except(:due_date).each do |k, v|
          expect(task[k]).to eq(v)
        end
        expect(task.due_date).to eq(new_attributes[:due_date].to_date)
      end

      it "renders a JSON response with the task" do
        task = Task.create! valid_attributes

        put :update, params: {id: task.to_param, task: valid_attributes}, session: valid_session
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json')
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the task" do
        task = Task.create! valid_attributes

        put :update, params: {id: task.to_param, task: invalid_attributes}, session: valid_session
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json')
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested task" do
      task = Task.create! valid_attributes
      expect {
        delete :destroy, params: {id: task.to_param}, session: valid_session
      }.to change(Task, :count).by(-1)
    end
  end
end
