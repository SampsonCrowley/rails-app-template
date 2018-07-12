class AuditExistingTables < ActiveRecord::Migration[5.2]
  TABLES = %w(
    active_admin_comments
    active_storage_attachments
    active_storage_blobs
    admin_users
    appointments
    clients
    tasks
  )

  def up
    TABLES.each do |t|
      execute "SELECT audit.audit_table('#{t}');"
    end
  end

  def down
    TABLES.each do |t|
      execute "DROP TRIGGER audit_trigger_row ON #{t};"
      execute "DROP TRIGGER audit_trigger_stm ON #{t};"
    end
  end
end
