import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

import { normHor } from 'src/theme';
import { NoDataMessage } from 'src/ui';
import { TransactionType } from 'src/types';

import { TransactionItem } from './transaction-item';

const List = styled(ScrollView)`
  padding: 0 ${normHor(15)}px;
`;

type Props = {
  transactionsList: TransactionType[];
};

export const Transactions = ({ transactionsList }: Props) => {
  if (!transactionsList?.length) {
    return <NoDataMessage />;
  }

  return (
    <List>
      {transactionsList.map(props => (
        <TransactionItem key={props.indexTransaction} {...props} />
      ))}
    </List>
  );
};
