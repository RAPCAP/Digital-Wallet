import React, { useCallback, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { CardFromStorageType } from 'src/types';
import { cardColors, normVert, normHor } from 'src/theme';
import { useAnimatedNumber } from 'src/hooks';

const CardItemRoot = styled(View)`
  padding: ${normVert(14)}px;
`;
const CardItem = styled(View)<{ cardColor: string }>`
  background: ${p => p.cardColor};
  border-radius: ${normVert(10)}px;
  height: ${normVert(130)}px;
`;
const CardName = styled(Text)`
  font-size: ${normVert(16)}px;
  padding-left: ${normHor(20)}px;
  padding-top: ${normVert(8)}px;
  flex: 1;
`;
const Amount = styled(Text)`
  font-size: ${normVert(20)}px;
  text-align: center;
  flex: 1;
`;
const Button = styled(TouchableOpacity)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled(Text)`
  font-size: ${normVert(12)}px;
  text-decoration: underline;
`;

type Props = {
  item: CardFromStorageType;
  onAddTransaction: (index: number) => void;
};

export const CarouselItem = ({ item, onAddTransaction }: Props) => {
  const { name, amount, index } = item;
  const colorIndex = index % 10;
  const cardColor = cardColors[colorIndex];

  const oldValueRef = useRef(0);
  const animatedAmount = useAnimatedNumber(oldValueRef.current, amount);

  useEffect(() => {
    if (oldValueRef.current !== amount) {
      oldValueRef.current = amount;
    }
  }, [amount]);

  const onPress = useCallback(() => {
    onAddTransaction(index);
  }, [index, onAddTransaction]);

  return (
    <CardItemRoot>
      <CardItem cardColor={cardColor}>
        <CardName>{name}</CardName>
        <Amount>{`${animatedAmount}$`}</Amount>

        <Button onPress={onPress}>
          <ButtonText>Add income / expense</ButtonText>
        </Button>
      </CardItem>
    </CardItemRoot>
  );
};
