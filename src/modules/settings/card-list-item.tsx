import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { Separator } from 'src/ui';
import { normVert, normHor, cardColors, colors } from 'src/theme';

const Root = styled(View)`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-top: ${normHor(3)}px;
`;
const Name = styled(Text)`
  font-size: ${normHor(16)}px;
`;
const RemoveButton = styled(TouchableOpacity)`
  padding: ${normVert(10)}px 10px;
`;
const MiniCard = styled(View)<{ cardColor: string }>`
  background: ${p => p.cardColor};
  height: ${normVert(15)}px;
  width: ${normVert(24)}px;
  margin-right: ${normVert(6)}px;
  border-radius: ${normVert(2)}px;
  border: 0.2px solid ${colors.grays[0]};
`;
const LeftContent = styled(View)`
  align-items: center;
  flex-direction: row;
`;

type Props = {
  name: string;
  index: number;
  onRemoveCard: (index: number) => void;
};

export const CardListItem = ({ name, index, onRemoveCard }: Props) => {
  const onPress = useCallback(() => {
    onRemoveCard(index);
  }, [index, onRemoveCard]);

  const colorIndex = index % 10;
  const cardColor = cardColors[colorIndex];

  return (
    <>
      <Root>
        <LeftContent>
          <MiniCard cardColor={cardColor} />
          <Name>{name}</Name>
        </LeftContent>

        <RemoveButton onPress={onPress}>
          <Text>✕</Text>
        </RemoveButton>
      </Root>
      <Separator />
    </>
  );
};
