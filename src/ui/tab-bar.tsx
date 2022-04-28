import React from 'react';
import { TabBar as TabBarDefault } from 'react-native-tab-view';
import styled from 'styled-components/native';

import { colors } from 'src/theme';

const TabViewStyled = styled(TabBarDefault)`
  background: ${colors.tabBarBG};
`;

const indicatorStyle = { backgroundColor: colors.white };

export const TabBar = (props: any) => {
  return <TabViewStyled {...props} indicatorStyle={indicatorStyle} />;
};
