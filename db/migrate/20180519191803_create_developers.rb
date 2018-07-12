class CreateDevelopers < ActiveRecord::Migration[5.2]
  def change
    create_table :developers do |t|
      t.string :email, null: false
      t.text :password, null: false
      t.string :first, null: false
      t.string :middle
      t.string :last, null: false
      t.string :suffix
      t.date :dob

      t.timestamps default: -> { 'NOW()' }

      t.index [ :email ], unique: true
    end
  end
end
