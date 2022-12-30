import React, { Fragment, useEffect, useReducer } from 'react';
import { fetchLineFoods } from '../apis/line_foods';
import { lineFoodsActionTypes, lineFoodsInitialState, lineFoodsReducer } from '../reducers/lineFoods';
import MainLogo from '../images/logo.png';
import { REQUEST_STATE } from '../constants';
import { CircularProgress, Link } from '@mui/material';
import styled from '@emotion/styled';
import { postOrder } from '../apis/orders';
import { OrderDetailItem } from '../components/OrderDetailItem';
import { OrderButton } from '../components/Buttons/OrderButton';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const OrderListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const OrderItemWrapper = styled.div`
  margin-bottom: 50px;
`;

export const Orders = () => {
  const [lineFoodsState, dispatch] = useReducer(lineFoodsReducer, lineFoodsInitialState)

  const postLineFoods = () => {
    dispatch({ type: lineFoodsActionTypes.POSTING });
    postOrder({
      line_food_ids: lineFoodsState.lineFoodsSummary.line_food_ids,
    }).then(() => {
      dispatch({ type: lineFoodsActionTypes.POST_SUCCESS });
      window.location.reload();
    });
  };

  const orderButtonLabel = () => {
    switch (lineFoodsState.postState) {
      case REQUEST_STATE.LOADING:
        return '注文中...';
      case REQUEST_STATE.OK:
        return '注文が完了しました！';
      default:
        return '注文を確定する';
    }
  };

  // 注文情報を入手
  useEffect(() => {
    dispatch({ type: lineFoodsActionTypes.FETCHING });
    fetchLineFoods()
    .then((data) =>
      dispatch({
        type: lineFoodsActionTypes.FETCH_SUCCESS,
        payload: {lineFoodsSummary: data}
      })
    )
    .catch((e) => console.error(e));
  }, []);

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
      </HeaderWrapper>
      <OrderListWrapper>
          <div>
            <OrderItemWrapper>
              {// APIローディング中はくるくる回るローディングコンポーネントを表示
                lineFoodsState.fetchState === REQUEST_STATE.LOADING ?
                  <CircularProgress />
                :
                  lineFoodsState.lineFoodsSummary &&
                    <OrderDetailItem lineFoodsState={lineFoodsState} />
              }
            </OrderItemWrapper>
          <div>
            {lineFoodsState.fetchState === REQUEST_STATE.OK && lineFoodsState.lineFoodsSummary &&
                <OrderButton
                  onClick={() => postLineFoods()}
                  disabled={lineFoodsState.postState === REQUEST_STATE.LOADING || lineFoodsState.postState === REQUEST_STATE.OK}
                >
                  {orderButtonLabel()}
                </OrderButton>
            }
            {lineFoodsState.fetchState === REQUEST_STATE.OK && !(lineFoodsState.lineFoodsSummary) &&
                <p>
                  注文予定の商品はありません。
                </p>
            }
          </div>
        </div>
      </OrderListWrapper>
    </Fragment>
  )
}