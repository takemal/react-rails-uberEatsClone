import styled from '@emotion/styled';
import { Link, Skeleton } from '@mui/material';
import React, { Fragment, useReducer, useEffect } from 'react';
import { fetchRestaurants } from '../apis/restaurants';
import { REQUEST_STATE } from '../constants';
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png';
import { restaurantsInitialState, restaurantsActionTypes, restaurantsReducer } from '../reducers/restaurants';
import RestaurantImage from '../images/restaurant-image.jpg';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 600px;
`;
const RestaurantsContentsList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;
`;

const RestaurantsContentWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 48px;
`;
const RestaurantsImageNode = styled.img`
  width: 100%;
`;

const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;

export const Restaurants = () => {
  const [restaurantsState, dispatch] = useReducer(restaurantsReducer, restaurantsInitialState)
  
// レストラン情報を取得しデータをReducerに代入
  useEffect(() => {
    dispatch({ type: restaurantsActionTypes.FETCHING });
    fetchRestaurants()
    .then((data) =>
      dispatch({
        type: restaurantsActionTypes.FETCH_SUCCESS,
        payload: { restaurants: data.restaurants }
      })
    )
  }, [])

  return (
    <Fragment>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>
      <RestaurantsContentsList>
        { restaurantsState.fetchState === REQUEST_STATE.LOADING?(
          <>
            <Skeleton variant='rect' width={450} height={300} />
            <Skeleton variant='rect' width={450} height={300} />
            <Skeleton variant='rect' width={450} height={300} />
          </>
        ) : (
          restaurantsState.restaurants.map((restaurant, index)=>(
            <Link to ={`/restaurants/${restaurant.id}/foods`} key={index} style={{textDecoration:'none'}} >
              <RestaurantsContentWrapper>
                <RestaurantsImageNode src={RestaurantImage} />
                <MainText>{restaurant.name}</MainText>
                <SubText>`配送料:${restaurant.fee}円 ${restaurant.time_required}分</SubText>
              </RestaurantsContentWrapper>
            </Link>
          ))
        )
      }
      </RestaurantsContentsList>
    </Fragment>
  )
}
