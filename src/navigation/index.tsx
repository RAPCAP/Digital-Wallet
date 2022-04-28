import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { NewCardScreen } from 'src/modules';
import { NewTransactionScreen } from 'src/modules/new-transaction';

import { Tabs } from './tabs';
import { Routes } from './routes';

const RootStack = createStackNavigator();

export const Root = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Group>
          <RootStack.Screen name={Routes.Home} component={Tabs} />
        </RootStack.Group>

        <RootStack.Group screenOptions={{ presentation: 'transparentModal' }}>
          <RootStack.Screen
            name={Routes.ModalAddCard}
            component={NewCardScreen}
          />
          <RootStack.Screen
            name={Routes.ModalAddTransaction}
            component={NewTransactionScreen}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
