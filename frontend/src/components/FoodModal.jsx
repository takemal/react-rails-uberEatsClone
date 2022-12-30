import React from 'react';
import styled from 'styled-components';
import { SubText } from './StyledText';
import OrderHeaderImage from '../images/order-header.png';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CountUpButton } from './Buttons/CountUpButton';
import { CountDownButton } from './Buttons/CountDownButton';
import { OrderButton } from './Buttons/OrderButton';
import { postLineFoods } from '../apis/line_foods';
import { useNavigate } from 'react-router-dom';
import { HTTP_STATUS_CODE } from '../constants';

const OrderHeader = styled.img`
  width: 100%;
  height: 350px;
`;

const DescriptionWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

const CountersWrapper = styled.div`
  margin-right: auto;
  display: flex;
  padding: 0 16px;
`;

const CountItem = styled.div`
  margin: 0 8px;
`

const CountNum = styled.div`
  padding-top: 10px;
`

const OrderTextWrapper = styled.div`
  display: flex;
`;

const OrderButtonTextWrapper = styled.div`
  width: 300px;
`;

const PriceWrapper = styled.div`
  padding-top: 4px;
`;



// onClickOrder={() => submitOrder()}


export const FoodModal = ({foodModal, setFoodModal }) => {
  const food = foodModal.selectedFood
  const count = foodModal.selectedFoodCount
  const navigate = useNavigate()

  // カウントアップ
  const countUp = () => {
    setFoodModal({
      ...foodModal,
      selectedFoodCount: foodModal.selectedFoodCount + 1,
    })
  }

  // カウントダウン
  const countDown = () => {
    setFoodModal({
      ...foodModal,
      selectedFoodCount: foodModal.selectedFoodCount - 1,
    })
  }

  // 注文処理。もし完了したら確認画面に遷移。
  const submitOrder = () => {
    postLineFoods({
      foodId: foodModal.selectedFood.id,
      count: foodModal.selectedFoodCount,
    }).then(() => navigate('/orders'))
      .catch((e) => {
        // レスポンスが406なら、foodModalを更新する。(例外処理モーダルを開く)
        if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          setFoodModal({
            ...foodModal,
            isOpenOrder: false,
            isOpenNewOrder: true,
            existingRestaurantName: e.response.data.existing_restaurant,
            newRestaurantName: e.response.data.new_restaurant,
          })
        } else {
          throw e;
        }
      })
  };


  // 閉じた時の初期化
  const onClose = () =>{
    setFoodModal({
      ...foodModal,
      isOpen: false,
      selectedFood: null,
      selectedFoodCount: 1,
    })
  }

  return (
    <Dialog open={foodModal.isOpen} onClose={onClose} >
      <OrderHeader src={OrderHeaderImage} alt="order header" />
      <DialogTitle>
        {food.name}
      </DialogTitle>
      <DialogContent>
        <DescriptionWrapper>
          <SubText>
            {food.description}
          </SubText>
        </DescriptionWrapper>
      </DialogContent>
      <DialogActions>
        <CountersWrapper>
          <CountItem>
          {/*カウントダウン。数量が1以下で変更無し */}
            <CountDownButton onClick={() => countDown()} isDisabled={count <= 1} />
          </CountItem>
          <CountItem>
            <CountNum> {count} </CountNum>
          </CountItem>
          <CountItem>
            {/* カウントアップ。数量が9以上で変更無し */}
            <CountUpButton onClick={() => countUp()} isDisabled={count >= 9} />
          </CountItem>
        </CountersWrapper>
        {/* 注文処理ボタン */}
        <OrderButton onClick={() => submitOrder()}>
          <OrderTextWrapper>
            <OrderButtonTextWrapper> {`${count}点を注文に追加`} </OrderButtonTextWrapper>
            <PriceWrapper> {`¥${count * food.price}`} </PriceWrapper>
          </OrderTextWrapper>
        </OrderButton>
      </DialogActions>
    </Dialog>
  )
}