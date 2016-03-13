require_relative '../rails_helper'

feature "Login" do
  given!(:user) { create(:user) }
  # background do
    # visit '/users/sign_in'
    # save_and_open_screenshot
    # click_button "SIGN UP"
    # click_button('Register')
  # end

  scenario "Visitor registers successfully via register form", js: true do
    # visit new_user_registration_path
    visit '/users/sign_in'
    save_and_open_page
    within('#signin-form') do
      # fill_in 'user[email]', with: Faker::Internet.email
      fill_in 'user[email]', with: user.email
      # fill_in 'user[password]', with: '12345678'
      fill_in 'user[password]', with: user.password
      # fill_in 'user[password_confirmation]', with: '12345678'
      click_button('Sign In')
    end
    expect(page).not_to have_content 'Sign In'
    expect(page).to have_content 'My account'
    # expect(page).to have_content 'You have signed up successfully.'
  end
end

# feature "Log in with Facebook" do
#   given!(:user) { create(:user) }

#   background do
#     visit new_user_session_path

#     OmniAuth.config.test_mode = true

#     OmniAuth.config.mock_auth[:facebook] = {
#         :provider => 'facebook',
#         :uid => '12345',
#     }
#   end

#   scenario "Visitor logs in successfully via facebook" do
#     click_link('facebook-login')

#     expect(page).not_to have_content 'Log in'
#     expect(page).to have_content 'Sign out'
#     expect(page).to have_content 'Signed in successfully.'
#   end
# end
