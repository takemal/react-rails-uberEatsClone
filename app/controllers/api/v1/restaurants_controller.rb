module Api
  module V1
    class RestaurantsController < ApplicationController
      def index
        restaurants = Restaurant.all
        # JSON形式でデータを返す
        render json: {
          restaurants: restaurants
        }, status: :ok
      end
    end
  end
end