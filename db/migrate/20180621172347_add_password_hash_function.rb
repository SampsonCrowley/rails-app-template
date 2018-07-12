class AddPasswordHashFunction < ActiveRecord::Migration[5.2]
  def up
    execute "CREATE EXTENSION IF NOT EXISTS pgcrypto;"

    execute <<-SQL
      CREATE OR REPLACE FUNCTION hash_password(password text)
        RETURNS text AS
      $BODY$
      BEGIN
        password = crypt(password, gen_salt('bf', 8));

        RETURN password;
      END;
      $BODY$

      LANGUAGE plpgsql;
    SQL
  end

  def down
    execute "DROP FUNCTION IF EXISTS hash_password();"
    execute "DROP EXTENSION IF EXISTS pgcrypto;"
  end
end
