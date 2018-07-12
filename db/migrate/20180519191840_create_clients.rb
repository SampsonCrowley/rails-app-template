class CreateClients < ActiveRecord::Migration[5.2]
  def change
    create_table :clients do |t|
      t.text :first_name, null: false
      t.text :last_name, null: false
      t.text :email
      t.text :phone
      t.text :phone_type

      t.timestamps default: -> { 'NOW()' }
      t.timestamps
    end
  end
end
