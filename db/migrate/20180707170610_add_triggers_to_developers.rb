class AddTriggersToDevelopers < ActiveRecord::Migration[5.2]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION developer_changed()
        RETURNS TRIGGER AS
      $BODY$
      BEGIN
        IF (NEW.password IS NOT NULL)
        AND (
          (TG_OP = 'INSERT') OR ( NEW.password IS DISTINCT FROM OLD.password )
        ) THEN
          NEW.password = hash_password(NEW.password);
        END IF;

        IF (TG_OP = 'INSERT') OR ( NEW.email IS DISTINCT FROM OLD.email ) THEN
          NEW.email = validate_email(NEW.email);
        END IF;

        RETURN NEW;
      END;
      $BODY$
      language 'plpgsql';
    SQL

    execute <<-SQL
      CREATE TRIGGER developers_on_insert
      BEFORE INSERT ON developers
      FOR EACH ROW
      EXECUTE PROCEDURE developer_changed();
    SQL

    execute <<-SQL
      CREATE TRIGGER developers_on_update
      BEFORE UPDATE ON developers
      FOR EACH ROW
      EXECUTE PROCEDURE developer_changed();

    SQL

    execute "SELECT audit.audit_table('developers', BOOLEAN 't', BOOLEAN 'f', '{password}'::text[]);"

  end

  def down
    execute "DROP TRIGGER IF EXISTS developers_on_insert ON developers;"
    execute "DROP TRIGGER IF EXISTS developers_on_update ON developers;"
    execute "DROP TRIGGER audit_trigger_row ON developers;"
    execute "DROP TRIGGER audit_trigger_stm ON developers;"
  end
end
