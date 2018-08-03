class CreateStates < ActiveRecord::Migration[5.2]
  def change
    create_table :states do |t|
      t.text :abbr, null: false
      t.text :full, null: false
      t.boolean :is_foreign, null: false, default: false

      t.index [ :abbr ], unique: true
      t.index [ :full ], unique: true
    end

    audit_table :states
  end
end
