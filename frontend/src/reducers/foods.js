import { REQUEST_STATE } from '../constants';

export const foodsInitialState = {
  fetchState: REQUEST_STATE.INITIAL,
  foods: [],
};

export const foodsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
}

export const foodsReducer = (state, action) => {
  switch (action.type) {
    case foodsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case foodsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        foods: action.payload.foods,
      };
    default:
      throw new Error();
  }
}