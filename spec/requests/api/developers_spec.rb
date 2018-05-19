require 'rails_helper'

RSpec.describe "API::Developers", type: :request do
  describe "GET /api/developers" do
    it "works! (now write some real specs)" do
      get api_developers_path
      expect(response).to have_http_status(200)
    end
  end
end
