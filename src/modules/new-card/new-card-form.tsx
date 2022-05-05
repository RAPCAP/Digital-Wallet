import React, { useCallback, useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { Formik } from 'formik';
import styled from 'styled-components/native';

import { InputForm, Feedback, ConfirmButton } from 'src/ui';
import { addNewCardStorage } from 'src/tools';
import { normVert, colors } from 'src/theme';
import { CardsContext } from 'src/hooks';

import { NewCardFormValidationSchema } from './validation-schema';

const Header = styled(Text)`
  text-align: center;
  font-size: ${normVert(13)}px;
  padding-top: 2px;
  color: ${colors.black};
`;

type NewCardFormValueType = {
  cardName: string;
  initialAmount: string;
};

const initialValues: NewCardFormValueType = {
  cardName: '',
  initialAmount: '',
};

export const NewCardForm = ({ goBack }: { goBack: () => void }) => {
  const [isSaved, setIsSaved] = useState<boolean | undefined>();
  const { updateCards } = useContext(CardsContext);

  const onSubmit = useCallback(
    async (values: NewCardFormValueType) => {
      const { cardName, initialAmount } = values;

      addNewCardStorage(
        {
          name: cardName,
          amount: Number(initialAmount), // checked in validation scheme
        },
        () => {
          setIsSaved(true);
          updateCards();
          goBack();
        },
      );
    },
    [goBack, updateCards],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NewCardFormValidationSchema}
      onSubmit={onSubmit}>
      {props => (
        <View>
          <Header>New card</Header>

          <InputForm
            label="Name"
            name="cardName"
            placeholder="Main card"
            autoFocus
            {...props}
          />

          <InputForm
            name="initialAmount"
            label="Initial amount $"
            placeholder="1.000 $"
            {...props}
          />

          <Feedback
            isSuccessful={Boolean(isSaved)}
            text={isSaved ? 'Saved' : 'Something went wrong'}
            show={isSaved !== undefined}
          />

          <ConfirmButton onPress={props.submitForm} disabled={isSaved} />
        </View>
      )}
    </Formik>
  );
};
