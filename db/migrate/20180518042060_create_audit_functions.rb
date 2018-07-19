class CreateAuditFunctions < ActiveRecord::Migration[5.2]
  def up
    sql = ""
    source = File.new(Rails.root.join('db', 'postgres-audit-trigger.psql'), "r")
    while (line = source.gets)
      sql << line
    end
    source.close
    execute sql
  end

  def down
    execute <<-SQL
      DROP SCHEMA IF EXISTS audit CASCADE;
    SQL
  end
end
