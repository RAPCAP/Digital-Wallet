import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

import { Separator } from 'src/ui';
import { OperationType, TransactionType } from 'src/types';
import { normVert, colors } from 'src/theme';

const HistoryItem = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: ${normVert(10)}px 1px;
`;
const Comment = styled(Text)`
  font-size: ${normVert(12)}px;
`;
const Amount = styled(Text)<{ type: OperationType }>`
  font-size: ${normVert(12)}px;
  color: ${p => (p.type === OperationType.Income ? colors.green : colors.red)};
`;

export const TransactionItem = ({
  comment,
  amount,
  operationType,
}: TransactionType) => {
  const operatingSign = operationType === OperationType.Income ? '+' : '-';

  return (
    <React.Fragment>
      <HistoryItem>
        <Comment>{comment}</Comment>
        <Amount type={operationType}>{`${operatingSign} ${amount} $`}</Amount>
      </HistoryItem>

      <Separator />
    </React.Fragment>
  );
};
