require "rails_helper"

RSpec.describe API::DevelopersController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/api/developers").to route_to("api/developers#index")
    end


    it "routes to #show" do
      expect(:get => "/api/developers/1").to route_to("api/developers#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/api/developers").to route_to("api/developers#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/api/developers/1").to route_to("api/developers#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/api/developers/1").to route_to("api/developers#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/api/developers/1").to route_to("api/developers#destroy", :id => "1")
    end

  end
end
