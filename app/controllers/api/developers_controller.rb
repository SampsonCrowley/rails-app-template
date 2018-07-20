class API::DevelopersController < API::ApplicationController
  before_action :set_developer, only: [:show, :update, :destroy]

  # GET /developers
  def index
    @developers = Developer.order(:id).select(:id, :email, :first, :last).limit(100).offset(params[:start].presence || 0).all

    render json: @developers
  end

  # GET /developers/1
  def show
    p "SHOWING", @developer
    render json: @developer.to_json(include: { tasks: { only: [:id, :title]}})
  end

  # POST /developers
  def create
    @developer = Developer.new(developer_params)

    if @developer.save
      render json: @developer, status: :created, location: api_developer_url(@developer)
    else
      render json: @developer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /developers/1
  def update
    if @developer.update(developer_params)
      render json: @developer
    else
      render json: @developer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /developers/1
  def destroy
    @developer.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_developer
      @developer = Developer.includes(:tasks).find_by(id: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def developer_params
      params.require(:developer).permit(:email, :new_password, :new_password_confirmation, :first, :middle, :last, :suffix, :dob)
    end
end
