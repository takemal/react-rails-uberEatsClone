class LineFood < ApplicationRecord
  belongs_to :food
  belongs_to :restaurant
  # 関連先が存在しなくてもいい
  belongs_to :order, optional: true 

  validates :count, numericality: { greater_than: 0 }

  scope :active, -> { where(active: true) }
  # 他の仮注文がないか確認する
  scope :other_restaurant, -> (picked_restaurant_id) { where.not(restaurant_id: picked_restaurant_id) }

  def total_amount
    food.price * count
  end
end