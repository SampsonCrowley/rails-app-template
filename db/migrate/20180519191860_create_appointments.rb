class CreateAppointments < ActiveRecord::Migration[5.2]
  def change
    create_table :appointments do |t|
      t.references :client, foreign_key: true
      t.text :title
      t.text :description
      t.datetime :starting
      t.datetime :ending

      t.timestamps
    end
  end
end
