import React from 'react';

import { ModalWindow } from 'src/ui';
import { StackScreenProps } from 'src/navigation/routes';

import { NewTransactionForm } from './new-transaction-form';

export const NewTransactionScreen = ({ navigation }: StackScreenProps) => {
  const goBack = () => navigation.goBack();

  return (
    <ModalWindow goBack={goBack}>
      <NewTransactionForm />
    </ModalWindow>
  );
};
