import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import { FormikProps } from 'formik';
import styled from 'styled-components/native';

import { normVert, normHor, colors } from 'src/theme';

const Input = styled(TextInput)`
  padding: ${normVert(12)}px ${normHor(10)}px;
  background: ${colors.textInput};
  border-radius: ${normVert(10)}px;
`;
const Label = styled(Text)`
  padding-top: ${normVert(13)}px;
  padding-left: ${normHor(5)}px;
  padding-bottom: 4px;
`;
const ErrorText = styled(Text)`
  color: ${colors.red};
`;
const ErrorView = styled(View)`
  height: ${normVert(12)}px;
  padding-top: ${normVert(4)}px;
  padding-left: ${normHor(5)}px;
`;

export type InputFormPropsT = {
  label: string;
  name: string;
} & TextInputProps &
  FormikProps<any>;

export const InputForm = ({ label, name, ...p }: InputFormPropsT) => {
  const { handleChange, errors, touched, handleBlur } = p;

  const errorMessage = (touched?.[name] && errors?.[name]) || '';

  return (
    <>
      <Label>{label}</Label>
      <Input
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        {...p}
      />
      <ErrorView>
        <ErrorText>{errorMessage}</ErrorText>
      </ErrorView>
    </>
  );
};
