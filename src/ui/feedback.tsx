import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

import { normVert, colors } from 'src/theme';

const Root = styled(View)`
  height: ${normVert(15)}px;
`;
const FeedbackText = styled(Text)<{ isSuccessful: boolean }>`
  color: ${p => (p.isSuccessful ? colors.green : colors.red)}
  text-align: center;
  font-size: ${normVert(12)}px;
`;

type Props = {
  isSuccessful: boolean;
  text: string;
  show: Boolean;
};

export const Feedback = ({ isSuccessful, text, show }: Props) => {
  return (
    <Root>
      {show && <FeedbackText isSuccessful={isSuccessful}>{text}</FeedbackText>}
    </Root>
  );
};
