class Journal < ActiveRecord::Base
  validates :user_id, :title, :rating, :recommended, :review, presence: true
  STATUS = %w(draft published)
end
