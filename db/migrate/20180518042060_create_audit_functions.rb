class CreateAuditFunctions < ActiveRecord::Migration[5.2]
  def up
    sql = ""
    source = File.new(Rails.root.join('db', 'postgres-audit-trigger.psql'), "r")
    while (line = source.gets)
      sql << line.gsub(/SELECTED_SCHEMA_NAME/, ENV.fetch('DB_AUDIT_SCHEMA') { 'audit' })
    end
    source.close
    execute sql
  end

  def down
    execute <<-SQL
      DROP SCHEMA IF EXISTS #{ENV.fetch('DB_AUDIT_SCHEMA') { 'audit' }} CASCADE;
    SQL
  end
end
