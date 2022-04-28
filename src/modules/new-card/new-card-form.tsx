import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';

import { Formik } from 'formik';
import styled from 'styled-components/native';

import { InputForm, Feedback, ConfirmButton } from 'src/ui';
import { addNewCard } from 'src/tools';
import { normVert, colors } from 'src/theme';

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

export const NewCardForm = ({}) => {
  const [isSaved, setIsSaved] = useState<boolean | undefined>();

  const submitCallback = useCallback(error => {
    setIsSaved(error ? false : true);
  }, []);

  const onSubmit = useCallback(
    (values: NewCardFormValueType) => {
      const { cardName, initialAmount } = values;

      addNewCard(
        {
          name: cardName,
          amount: Number(initialAmount), // checked in validation scheme
        },
        submitCallback,
      );
    },
    [submitCallback],
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
