class AuditExistingTables < ActiveRecord::Migration[5.2]
  def change
    %w(
      active_admin_comments
      active_storage_attachments
      active_storage_blobs
      admin_users
      appointments
      clients
      tasks
    ).each do |t|
      audit_table t
    end
  end
end
