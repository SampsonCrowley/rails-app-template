class CreateDevelopers < ActiveRecord::Migration[5.2]
  def change
    create_table :developers do |t|
      t.string :email
      t.string :first
      t.string :middle
      t.string :last
      t.string :suffix
      t.date :dob

      t.timestamps default: -> { 'NOW()' }
    end
  end
end
