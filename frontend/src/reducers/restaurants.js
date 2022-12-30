import { REQUEST_STATE } from '../constants';

// 初期値
export const restaurantsInitialState = {
  fetchState: REQUEST_STATE.INITIAL,
  restaurants: [],
};

// タイプ設定
export const restaurantsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
}

// アクションタイプに応じて処理実施。アクセス完了したらリストに導入
// API取得中 => fetchStateはLOADINGにスイッチする
// API取得完了 => fetchStateをOKにスイッチし、restaurantsにデータを入れる

export const restaurantsReducer = (state, action) => {
  switch (action.type) {
    case restaurantsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case restaurantsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        restaurants: action.payload.restaurants,
      };
    default:
      throw new Error();
  }
}