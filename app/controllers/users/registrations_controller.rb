class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  def create
    super
  end
end