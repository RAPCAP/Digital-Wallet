import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { normVert } from 'src/theme';
import styled from 'styled-components/native';

const NoData = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Message = styled(Text)`
  font-size: ${normVert(12)}px;
  text-align: center;
  font-family: 'system font';
`;
const FunnyEmoji = styled(Text)<{ rotateEmojiDegree?: number }>`
  font-size: ${normVert(14)}px;
  padding-top: ${normVert(12)}px;
  font-weight: 600;
  ${p =>
    p.rotateEmojiDegree ? `transform: rotate(${p.rotateEmojiDegree}deg)` : ''}
`;

type Props = {
  message?: string;
  funnyEmojiText?: string;
  rotateEmojiDegree?: number;
};

export const NoDataMessage = memo(
  ({ message, funnyEmojiText, rotateEmojiDegree }: Props) => {
    return (
      <NoData>
        <Message>{message || 'no data'}</Message>

        <FunnyEmoji rotateEmojiDegree={rotateEmojiDegree}>
          {funnyEmojiText || '¯(°_o)/¯'}
        </FunnyEmoji>
      </NoData>
    );
  },
);
