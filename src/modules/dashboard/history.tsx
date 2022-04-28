import React, { useCallback, useReducer } from 'react';
import { ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components/native';

import { TransactionsMappedType, TransactionType } from 'src/types';
import { getAllTransactions } from 'src/tools';
import { normHor } from 'src/theme';

import { renderHistoryItem } from './history-item';

const HistoryList = styled(ScrollView)`
  padding: 0 ${normHor(15)}px;
`;

type Props = {
  currentCardIndex: number;
};

const CARD_KEY_PREFIX = 'c-';

const reducer = (_: TransactionsMappedType, value: TransactionType[]) => {
  const currentState: TransactionsMappedType = {};

  value.map(
    ({ amount, cardIndex, comment, indexTransaction, operationType }) => {
      const key = `${CARD_KEY_PREFIX}${cardIndex}`;

      currentState[key] = [
        ...(currentState?.[key] || []),
        {
          amount,
          comment,
          indexTransaction,
          operationType,
          cardIndex,
        },
      ];
    },
  );

  return currentState;
};

export const History = ({ currentCardIndex }: Props) => {
  const [transaction, dispatchTransactions] = useReducer(reducer, {});

  const getTransactions = useCallback(() => {
    const load = async () => {
      const data = await getAllTransactions();

      dispatchTransactions(data);
    };

    load();
  }, []);

  useFocusEffect(getTransactions);

  const currentListKey = `${CARD_KEY_PREFIX}${currentCardIndex}`;

  const currentList = (transaction?.[currentListKey] || []).sort((a, b) => {
    return b.indexTransaction - a.indexTransaction;
  });

  return <HistoryList>{currentList.map(renderHistoryItem)}</HistoryList>;
};
