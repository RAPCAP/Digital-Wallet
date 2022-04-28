import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

import { normVert, normHor, colors } from 'src/theme';

type Props = {
  onPress: () => void;
  disabled: boolean | null | undefined;
  text?: string;
};

const Root = styled(TouchableOpacity)<Props>`
  margin-top: ${normVert(12)}px;
  padding: ${normVert(12)}px ${normHor(10)}px;
  background: ${colors.textInput};
  opacity: ${p => (p.disabled ? 0.2 : 1)}
  border-radius: ${normVert(10)}px;
`;
const ConfirmButtonText = styled(Text)`
  text-align: center;
`;

export const ConfirmButton = ({
  onPress,
  disabled,
  text = 'Confirm',
}: Props) => {
  return (
    <Root onPress={onPress} disabled={disabled}>
      <ConfirmButtonText>{text}</ConfirmButtonText>
    </Root>
  );
};
