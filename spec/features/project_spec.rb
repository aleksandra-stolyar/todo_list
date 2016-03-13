require_relative '../rails_helper'

feature "Project" do
  given(:user) { create(:user) }
  given!(:project) { create(:project, user: user, name: 'new project') }

  before do
    login_as(user, :scope => :user)
    visit "/"
  end

  scenario "Logged in user adds project" do
    save_and_open_page
    within('#newProject') do
      fill_in 'project[name]', with: project.name
      # find(:xpath, "//input[@id='stars-form']").set Faker::Number.between(1, 10)
      click_button('Add TODO List')

    end
    # expect(page).not_to have_content 'Add review'
    expect(page).to have_content 'Hoooray! You have new project!'
    # save_and_open_page
    # save_and_open_screenshot
  end

  # scenario "Logged in user adds review with empty fields" do
  #   within('#new_rating') do
  #     fill_in 'rating[text_review]', with: ""
  #     find(:xpath, "//input[@id='stars-form']").set ""
  #     click_button('Add review')
  #   end
  #   expect(page).not_to have_content 'Add review'
  # end

end