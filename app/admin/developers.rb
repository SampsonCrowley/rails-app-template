ActiveAdmin.register Developer do
  # default_fields :first, :middle, :last, :suffix, :dob, :email

  permit_params :first, :middle, :last, :suffix, :dob, :email, :new_password, :new_password_confirmation
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # permit_params :list, :of, :attributes, :on, :model
  #
  # or
  #
  # permit_params do
  #   permitted = [:permitted, :attributes]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

end
