class CreateJournals < ActiveRecord::Migration
  def change
    create_table :journals do |t|
      t.integer :user_id
      t.string :title
      t.integer :rating
      t.boolean :recommended
      t.string :review
      t.timestamp :date_watched

      t.timestamps null: false
    end
  end
end
