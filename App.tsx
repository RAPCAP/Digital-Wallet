import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Root } from './src/navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <Root />
    </SafeAreaProvider>
  );
};

export default App;
