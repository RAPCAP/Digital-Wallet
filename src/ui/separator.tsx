import { View } from 'react-native';
import styled from 'styled-components/native';

import { colors } from 'src/theme';

export const Separator = styled(View)`
  background: ${colors.grays[0]};
  height: 1px;
  flex: 1;
`;
