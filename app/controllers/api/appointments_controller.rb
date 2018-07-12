class API::AppointmentsController < ApplicationController
  before_action :set_developer, only: [:show, :update, :destroy]

  # GET /appointments
  def index
    @appointments = Appointment.order(:id).select(:id, :client_id, :title, :starting, :ending).limit(100).offset(params[:start].presence || 0).all

    render json: @appointments
  end

  # GET /appointments/1
  def show
    p "SHOWING", @appointment
    render json: @appointment.to_json(include: { client: { only: [:id, :first, :last, :email, :phone, :phone_type] }})
  end

  # POST /appointments
  def create
    @appointment = Developer.new(appointment_params)

    if @appointment.save
      render json: @appointment, status: :created, location: api_appointment_url(@appointment)
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /appointments/1
  def update
    if @appointment.update(appointment_params)
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /appointments/1
  def destroy
    @appointment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_appointment
      @appointment = Appointment.includes(:client).find_by(id: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def appointment_params
      params.require(:appointment).permit(:id, :client_id, :title, :description, :starting, :ending)
    end
end
