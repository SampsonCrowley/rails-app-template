require 'rails_helper'

RSpec.describe API::DevelopersController, type: :controller do

  # This should return the minimal set of attributes required to create a valid
  # Developer. As you add validations to Developer, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    {
      first: 'some',
      middle: 'guy',
      last: 'some',
      suffix: 'where',
      dob: 13.years.ago,
      email: 'sample@sample.sample.sample-sample.sample',
      new_password: 'asdfasdf',
      new_password_confirmation: 'asdfasdf'
    }
  }

  let(:invalid_attributes) {
    {
      first: 's',
      dob: 12.years.ago,
      email: 'sample@sample',
      new_password: 'asdfasdf'
    }
  }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # DevelopersController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET #index" do
    it "returns a success response" do
      developer = Developer.create! valid_attributes
      get :index, params: {}, session: valid_session
      expect(response).to be_successful
    end

    it "is limited to 100 results" do
      150.times do
        create(:developer)
      end
      get :index, params: {}, session: valid_session
      expect(JSON.parse(response.body).size).to eq(100)
    end

    it "takes a 'start' param to offset results" do
      150.times do |i|
        create(:developer)
      end
      developer = Developer.order(:id).offset(10).limit(1).last
      get :index, params: {start: 10}, session: valid_session
      expect(JSON.parse(response.body).first['id']).to eq(developer.id)
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      developer = Developer.create! valid_attributes
      get :show, params: {id: developer.to_param}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Developer" do
        expect {
          post :create, params: {developer: valid_attributes}, session: valid_session
        }.to change(Developer, :count).by(1)
      end

      it "renders a JSON response with the new developer" do

        post :create, params: {developer: valid_attributes}, session: valid_session
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json')
        expect(response.location).to eq(api_developer_url(Developer.last))
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the new developer" do

        post :create, params: {developer: invalid_attributes}, session: valid_session
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json')
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        {
          first: 'stuff',
          middle: 'to',
          last: 'update',
          suffix: 'now',
          dob: 17.years.ago.to_date,
          email: 'brand@new.email',
        }
      }

      it "updates the requested developer" do
        developer = Developer.create! valid_attributes
        put :update, params: {id: developer.to_param, developer: new_attributes}, session: valid_session
        developer.reload
        new_attributes.except(:dob).each do |k, v|
          expect(developer[k]).to eq(v)
        end
        expect(developer.dob).to eq(new_attributes[:dob].to_date)
      end

      it "renders a JSON response with the developer" do
        developer = Developer.create! valid_attributes

        put :update, params: {id: developer.to_param, developer: valid_attributes}, session: valid_session
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json')
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the developer" do
        developer = Developer.create! valid_attributes

        put :update, params: {id: developer.to_param, developer: invalid_attributes}, session: valid_session
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json')
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested developer" do
      developer = Developer.create! valid_attributes
      expect {
        delete :destroy, params: {id: developer.to_param}, session: valid_session
      }.to change(Developer, :count).by(-1)
    end
  end

end
