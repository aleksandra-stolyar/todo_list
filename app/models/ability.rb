class Ability
  include CanCan::Ability

  def initialize(user)
    alias_action :create, :read, :update, :destroy, :to => :crud

    if user
      can [:crud, :save_sort], Project, user_id: user.id
      can [:crud, :set_status], Task, project: { user_id: user.id }
      can :crud, Comment, task: { project: { user_id: user.id } }
      can :create, Attachment, comment: { task: { project: { user_id: user.id } } }
    end
  end
end
