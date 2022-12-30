import axios from 'axios';
import { restaurantsIndex } from '../urls/index'

// JSON形式でデータを取得する
export const fetchRestaurants =() => {
  return axios.get(restaurantsIndex)
  .then(res => {return res.data})
  .catch((e) => console.error(e))
}