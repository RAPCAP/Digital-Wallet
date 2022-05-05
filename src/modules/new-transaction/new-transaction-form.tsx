import React, { useCallback, useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { Formik } from 'formik';
import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';

import { InputForm, Feedback, PairedButtons } from 'src/ui';
import { addTransactionStorage } from 'src/tools';
import { OperationType } from 'src/types';
import { Routes, UseRouseParams } from 'src/navigation/routes';
import { CardsContext, TransactionsContext } from 'src/hooks';
import { normVert, colors } from 'src/theme';

import { NewTransactionFormValidationSchema } from './validation-schema';

const Header = styled(Text)`
  text-align: center;
  font-size: ${normVert(13)}px;
  padding-top: 2px;
  color: ${colors.black};
`;

type NewTransactionFormType = {
  amount: string;
  comment: string;
  operationType: undefined | OperationType;
};

const initialValues: NewTransactionFormType = {
  amount: '',
  comment: '',
  operationType: undefined,
};

export const NewTransactionForm = () => {
  const [isSaved, setIsSaved] = useState<boolean | undefined>();
  const route = useRoute<UseRouseParams<Routes.ModalAddTransaction>>();

  const { updateTransactions } = useContext(TransactionsContext);
  const { updateCardByIndex } = useContext(CardsContext);

  const cardIndex = route?.params?.cardIndex as number;

  const onSubmit = useCallback(
    ({ comment, amount, operationType }: NewTransactionFormType) => {
      addTransactionStorage(
        {
          index: cardIndex,
          comment,
          amount: Number(amount), // checked in validation scheme
          operationType: operationType as OperationType, // set on submit
        },
        () => {
          updateTransactions();
          updateCardByIndex(cardIndex);
          setIsSaved(true);
        },
      );
    },
    [cardIndex, updateCardByIndex, updateTransactions],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NewTransactionFormValidationSchema}
      onSubmit={onSubmit}>
      {props => (
        <View>
          <Header>New Transaction</Header>

          <InputForm
            label="Amount"
            name="amount"
            placeholder="1.000 $"
            autoFocus
            {...props}
          />

          <InputForm
            name="comment"
            label="Comment"
            placeholder="Salary"
            {...props}
          />

          <Feedback
            isSuccessful={Boolean(isSaved)}
            text={isSaved ? 'Saved' : 'Something went wrong'}
            show={isSaved !== undefined}
          />
          <PairedButtons
            textLeft={'Income'}
            onPressLeft={() => {
              props.setFieldValue('operationType', OperationType.Income);
              props.submitForm();
            }}
            textRight={'Expense'}
            onPressRight={() => {
              props.setFieldValue('operationType', OperationType.Expense);
              props.submitForm();
            }}
            disabled={false}
          />
        </View>
      )}
    </Formik>
  );
};
