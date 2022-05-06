import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Root } from 'src/navigation';
import {
  useCards,
  CardsContext,
  TransactionsContext,
  useTransactions,
} from 'src/hooks';

const App = () => {
  const useCardsValue = useCards();
  const useTransactionsValue = useTransactions();

  return (
    <SafeAreaProvider>
      <StatusBar />
      <CardsContext.Provider value={useCardsValue}>
        <TransactionsContext.Provider value={useTransactionsValue}>
          <Root />
        </TransactionsContext.Provider>
      </CardsContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;
