import { useCallback, useEffect, useReducer, useState } from 'react';
import { getAllTransactionsStorage } from 'src/tools';
import { TransactionsMappedType, TransactionType } from 'src/types';

// use local as prefix in object of state
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

export type UseTransactionsValue = {
  currentTransactionsList: TransactionType[];
  transactionsForCardIndex: number;
  setTransactionsForCardIndex: React.Dispatch<React.SetStateAction<number>>;
  updateTransactions: () => Promise<void>;
};

export const useTransactions = (): UseTransactionsValue => {
  const [transaction, dispatchTransactions] = useReducer(reducer, {});
  const [transactionsForCardIndex, setTransactionsForCardIndex] = useState(0);

  const updateTransactions = useCallback(async () => {
    const data = await getAllTransactionsStorage();
    dispatchTransactions(data);
  }, []);

  const currentListKey = `${CARD_KEY_PREFIX}${transactionsForCardIndex}`;

  const currentTransactionsList = transactionsForCardIndex
    ? (transaction?.[currentListKey] || []).sort((a, b) => {
        return b.indexTransaction - a.indexTransaction;
      })
    : [];

  useEffect(() => {
    updateTransactions();
  }, [updateTransactions]);

  return {
    currentTransactionsList,
    transactionsForCardIndex,
    setTransactionsForCardIndex,
    updateTransactions,
  };
};
