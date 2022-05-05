import React from 'react';

import { ModalWindow } from 'src/ui';

import { NewCardForm } from './new-card-form';
import { StackScreenProps } from 'src/navigation/routes';

export const NewCardScreen = ({ navigation }: StackScreenProps) => {
  const goBack = () => navigation.goBack();

  return (
    <ModalWindow goBack={goBack}>
      <NewCardForm goBack={goBack} />
    </ModalWindow>
  );
};
