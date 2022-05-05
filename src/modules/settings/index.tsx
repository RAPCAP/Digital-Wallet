import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { removeCardStorage } from 'src/tools';
import { normVert, normHor } from 'src/theme';
import { CardsContext } from 'src/hooks';

import { CardListItem } from './card-list-item';
import { Header } from './header';
import { NoDataMessage } from 'src/ui';

const Root = styled(SafeAreaView)`
  flex: 1;
`;
const ScrollList = styled(ScrollView)`
  padding-top: ${normVert(18)}px;
  padding-right: ${normHor(16)}px;
  padding-left: ${normHor(16)}px;
`;

export const Settings = ({}: any) => {
  const { cards, onRemovedCard, updateCards } = useContext(CardsContext);

  const onRemoveCard = (index: number) => {
    removeCardStorage(index);
    onRemovedCard(index);
    updateCards();
  };

  return (
    <Root>
      <Header />
      <ScrollList>
        {cards.length ? (
          cards.map(({ name, index }) => (
            <CardListItem
              key={index}
              index={index}
              name={name}
              onRemoveCard={onRemoveCard}
            />
          ))
        ) : (
          <NoDataMessage
            message="Let's add"
            funnyEmojiText="(　-_･) ︻デ═一 "
            rotateEmojiDegree={-25}
          />
        )}
      </ScrollList>
    </Root>
  );
};
