import React, { Fragment, useReducer, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from "react-router-dom";
import { FoodWrapper } from '../components/FoodWrapper';
import { FoodModal, FoodOrderDialog } from '../components/FoodModal';
import {foodsInitialState, foodsActionTypes, foodsReducer,} from '../reducers/foods';
import { fetchFoods } from '../apis/foods';
import MainLogo from '../images/logo.png';
import { COLORS } from '../style_constants';
import { HTTP_STATUS_CODE, REQUEST_STATE } from '../constants';
import { Skeleton } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { FoodSwitchModal } from '../components/FoodSwitchModal';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

export const Foods = () => {
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  const params = useParams()

  // モーダル用state、
  const initialFoodModal = {
    isOpen: false,
    selectedFood: null,
    selectedFoodCount: 1,
    isOpenNewOrder: false,
    existingRestaurantName: '',
    newRestaurantName: '',
  }
  const [foodModal, setFoodModal] = useState(initialFoodModal);

  // レストランIDから商品リストを取得し、展開
  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(params.restaurantId)
      .then((data) => {
        dispatch({
          type: foodsActionTypes.FETCH_SUCCESS,
          payload: { foods: data.foods}
        });
      })
  }, []);

  return (
    <>
      {/* ヘッダー */}
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
        {/* データ取得中であればスケルトン表示 */}
        {foodsState.fetchState === REQUEST_STATE.LOADING ? (
          <Fragment>
            {
              [...Array(12).keys()].map(i =>
                <ItemWrapper key={i}>
                  <Skeleton key={i} variant="rect" width={450} height={180} />
                </ItemWrapper>
              )
            }
          </Fragment>
        ):(
          // データ取得完了で商品リストを展開
          foodsState.foods.map(food =>
            <ItemWrapper key={food.id}>
              <FoodWrapper food={food} foodModal={foodModal} setFoodModal={setFoodModal} />
            </ItemWrapper>
          )
        )}
      </FoodsList>
      {/* モーダルオープン(注文処理) */}
      { foodModal.isOpen &&
          <FoodModal foodModal={foodModal} setFoodModal={setFoodModal} />
      }
      {/* 例外処理オープン(注文処理) */}
      {foodModal.isOpenNewOrder &&
        <FoodSwitchModal foodModal={foodModal} setFoodModal={setFoodModal} />
      }
    </>
  )
}