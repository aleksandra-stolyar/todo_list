class RemoveAttachmentInAttachments < ActiveRecord::Migration
  def change
    remove_column :attachments, :attachment
  end
end
