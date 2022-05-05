import React from 'react';
import { UseCardsValue } from './use-cards';

// useContext get actual and correct types
export const CardsContext = React.createContext<UseCardsValue>(null as any);
