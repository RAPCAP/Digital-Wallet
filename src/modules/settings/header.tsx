import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Routes, RoutesParams } from 'src/navigation/routes';
import { normVert, normHor } from 'src/theme';

const Root = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${normVert(25)}px;
`;
const AddButton = styled(TouchableOpacity)`
  justify-content: center;
  text-align: center;
  padding-right: ${normHor(16)}px;
`;
const HeaderRightText = styled(Text)<{ color: string }>`
  text-align: right;
  color: ${p => p.color};
  font-size: ${normVert(12)}px;
`;
const HeaderText = styled(Text)`
  font-size: ${normVert(14)}px;
`;
const RightContent = styled(View)`
  flex: 1;
  justify-content: center;
  text-align: center;
`;
const CenterContent = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: ${normVert(25)}px;
`;
const LeftContent = styled(View)`
  flex: 1;
  align-items: flex-end;
`;

export const Header = (): JSX.Element => {
  const theme = useTheme();
  const navigation = useNavigation<RoutesParams>();

  const onPressAdd = useCallback(
    () => navigation.navigate(Routes.ModalAddCard),
    [navigation],
  );

  const color = theme.colors.primary;

  return (
    <Root>
      <RightContent />

      <CenterContent>
        <HeaderText>Settings</HeaderText>
      </CenterContent>

      <LeftContent>
        <AddButton onPress={onPressAdd}>
          <HeaderRightText color={color}>Add</HeaderRightText>
        </AddButton>
      </LeftContent>
    </Root>
  );
};
