class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  def create
    # binding.pry
    super
  end
end