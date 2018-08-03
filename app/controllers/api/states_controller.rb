module API
  class StatesController < ApplicationController
    # GET /states
    def index
      @states = State.order(:abbr, :full).select(:id, :abbr, :full, :is_foreign)

      render json: @states
    end
  end
end
