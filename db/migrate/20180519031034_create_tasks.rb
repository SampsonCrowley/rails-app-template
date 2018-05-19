class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :description
      t.date :due
      t.references :developer, foreign_key: true

      t.timestamps
    end
  end
end
