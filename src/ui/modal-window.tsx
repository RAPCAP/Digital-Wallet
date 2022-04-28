import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { normVert, normHor, colors } from 'src/theme';

const Root = styled(TouchableOpacity)`
  justify-content: center;
  flex: 1;
`;

const Window = styled(TouchableOpacity)`
  background: ${colors.modalBG};
  border: 1px solid ${colors.textInput};
  border-radius: ${normVert(10)}px;
  padding: ${normVert(12)}px ${normHor(10)}px;
  width: 70%;
  justify-content: center;
  align-self: center;
`;

type Props = {
  goBack: () => void;
  children: JSX.Element;
};

export const ModalWindow = ({ children, goBack }: Props) => {
  return (
    <Root onPress={goBack} activeOpacity={1}>
      <Window activeOpacity={1}>{children}</Window>
    </Root>
  );
};
