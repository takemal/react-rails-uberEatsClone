import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { replaceLineFoods } from '../apis/line_foods';
import { OrderButton } from './Buttons/OrderButton';

export const FoodSwitchModal = ({foodModal, setFoodModal}) => {
  const navigate = useNavigate()
  // 商品と個数を指定して注文する。完了したら確認画面に遷移
  const replaceOrder = () => {
    replaceLineFoods({
      foodId: foodModal.selectedFood.id,
      count: foodModal.selectedFoodCount,
    }).then(() => navigate('/orders'))
};

  // 閉じた時の初期化
  const onClose = () =>{
    setFoodModal({
      ...foodModal,
      isOpenNewOrder: false
    })
  }

  return(
    <Dialog open={foodModal.isOpenNewOrder} onClose={onClose} maxWidth="xs" >
    <DialogTitle>
      新規注文を開始しますか？
    </DialogTitle>
    <DialogContent>
      <p>
        {`ご注文に ${foodModal.existingRestaurantName} の商品が含まれています。
          新規の注文を開始して ${foodModal.newRestaurantName} の商品を追加してください。`}
      </p>
      
      <OrderButton onClick={replaceOrder}>
        新規注文
      </OrderButton>
    </DialogContent>
  </Dialog>
  )
}