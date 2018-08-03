class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.boolean :is_foreign, null: false, default: false
      t.text :street, null: false
      t.text :street_2
      t.text :street_3
      t.text :city, null: false
      t.references :state, foreign_key: true
      t.text :province
      t.text :zip, null: false
      t.text :country

      t.timestamps default: -> { 'NOW()' }
    end

    audit_table :addresses

    reversible do |d|
      d.up do
        execute <<-SQL
          ALTER TABLE addresses
            ADD CONSTRAINT address_state_or_province_and_country_exists CHECK (
              (state_id IS NOT NULL) OR (
                (province IS NOT NULL) AND
                (country IS NOT NULL)
              )
            );
        SQL
      end

      d.down do
        execute <<-SQL
          ALTER TABLE addresses
            DROP CONSTRAINT IF EXISTS address_state_or_province_and_country_exists;
        SQL
      end
    end
  end
end
