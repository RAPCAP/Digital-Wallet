import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Root } from 'src/navigation';
import {
  useCards,
  CardsContext,
  TransactionsContext,
  useTransactions,
} from 'src/hooks';
// import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const useCardsValue = useCards();
  const useTransactionsValue = useTransactions();

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  // AsyncStorage.clear();
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
