class CreateDevelopers < ActiveRecord::Migration[5.2]
  def change
    create_table :developers do |t|
      t.text :first
      t.text :middle
      t.text :last
      t.text :suffix
      t.date :dob
      t.text :email

      t.timestamps
    end
  end
end
