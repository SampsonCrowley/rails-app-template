class AddEmailValidationFunctions < ActiveRecord::Migration[5.2]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION validate_email(email text)
        RETURNS text AS
      $BODY$
      BEGIN
        IF email IS NOT NULL THEN
          IF email !~* '\\A[^@\\s\\;]+@[^@\\s\\;]+\\.[^@\\s\\;]+\\Z' THEN
            RAISE EXCEPTION 'Invalid E-mail format %', email
                USING HINT = 'Please check your E-mail format.';
          END IF ;
          email = lower(email);
        END IF ;

        RETURN email;
      END;
      $BODY$
      LANGUAGE plpgsql;
    SQL

    execute <<-SQL
      CREATE OR REPLACE FUNCTION valid_email_trigger()
        RETURNS TRIGGER AS
      $BODY$
      BEGIN
        NEW.email = validate_email(NEW.email);

        RETURN NEW;
      END;
      $BODY$
      LANGUAGE plpgsql;
    SQL
  end
  def down
    execute <<-SQL
      DROP FUNCTION IF EXISTS valid_email_trigger();
      DROP FUNCTION IF EXISTS validate_email();
    SQL
  end
end
