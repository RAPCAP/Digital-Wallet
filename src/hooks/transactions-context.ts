import React from 'react';
import { UseTransactionsValue } from './use-transactions';

// useContext get actual and correct types
export const TransactionsContext = React.createContext<UseTransactionsValue>(
  null as any,
);
