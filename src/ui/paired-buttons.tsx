import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components/native';

import { normVert, normHor, colors } from 'src/theme';

type Props = {
  disabled: boolean | null | undefined;
  onPressLeft: () => void;
  onPressRight: () => void;
  textRight: string;
  textLeft: string;
};

const LeftButton = styled(TouchableOpacity)`
  margin-top: ${normVert(10)}px;
  padding: ${normVert(12)}px ${normHor(10)}px;
  flex: 1;
  background: ${colors.textInput};
  border-top-left-radius: ${normVert(10)}px;
  border-bottom-left-radius: ${normVert(10)}px;
`;
const RightButton = styled(LeftButton)`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: ${normVert(10)}px;
  border-bottom-right-radius: ${normVert(10)}px;
`;
const Buttons = styled(View)`
  flex-direction: row;
`;
const ButtonText = styled(Text)`
  text-align: center;
`;

export const PairedButtons = ({
  disabled,
  onPressLeft,
  onPressRight,
  textRight,
  textLeft,
}: Props) => {
  return (
    <Buttons>
      <LeftButton onPress={onPressLeft} disabled={disabled}>
        <ButtonText>{textLeft}</ButtonText>
      </LeftButton>

      <RightButton onPress={onPressRight} disabled={disabled}>
        <ButtonText>{textRight}</ButtonText>
      </RightButton>
    </Buttons>
  );
};
