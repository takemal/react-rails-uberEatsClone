import React from 'react';
import styled from 'styled-components';
import { SubText } from './StyledText';
import { COLORS } from '../style_constants';
import FoodImage from '../images/food-image.jpg';

const Wrapper = styled.div`
  display: flex;
  width: 450px;
  height: 180px;
  border-width: 1px;
  border-style: solid;
  border-color: ${COLORS.BORDER};
  border-image: initial;
  cursor: pointer;
`;

const FoodDetail = styled.div`
  padding: 24px 16px;
  width: 250px;
`;

const DescriptionWrapper = styled.div`
  height: 75px;
`

const PriceWrapper = styled.div`
  margin-top: 16px;
`

const FoodImageNode = styled.img`
  width: 250px;
`;



export const FoodWrapper = ({ food, foodModal, setFoodModal }) => {
  const openModal = (food)=>{
    setFoodModal({
      ...foodModal,
      selectedFood: food,
      isOpen: true,    
    })
  }
  return(
    <Wrapper onClick={() => openModal(food)}>
    <FoodDetail>
      {food.name}
      <DescriptionWrapper>
        <SubText>
          {food.description}
        </SubText>
      </DescriptionWrapper>
      <PriceWrapper>
        ¥{food.price}
      </PriceWrapper>
    </FoodDetail>
    <FoodImageNode src={FoodImage} />
  </Wrapper>
  )
}
