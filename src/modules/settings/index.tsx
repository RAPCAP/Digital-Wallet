import React, { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getAllCards, removeCard, qSortByIndex } from 'src/tools';
import { CardFromStorageType } from 'src/types';
import { normVert, normHor } from 'src/theme';

import { CardListItem } from './ui/card-list-item';
import { Header } from './ui/header';

const Root = styled(SafeAreaView)`
  flex: 1;
`;
const ScrollList = styled(ScrollView)`
  padding-top: ${normVert(18)}px;
  padding-right: ${normHor(16)}px;
  padding-left: ${normHor(16)}px;
`;

export const Settings = () => {
  const [cards, setCards] = useState<CardFromStorageType[]>([]);

  const updateCards = useCallback(() => {
    const getCards = async () => {
      const cardsData = await getAllCards();

      // source data not sorted by index
      const sortedCard = qSortByIndex(cardsData);

      setCards(sortedCard);
    };

    getCards();
  }, []);

  useFocusEffect(updateCards);

  const onRemoveCard = (index: number) => {
    removeCard(index);
    setCards(prevCards => prevCards.filter(card => card.index !== index));
    // could be like that, but it's not optimal because of sorting
    // removeCard(index).then(updateCards);
  };

  return (
    <Root>
      <Header />
      <ScrollList>
        {cards.map(({ name, index }) => (
          <CardListItem
            key={index}
            index={index}
            name={name}
            onRemoveCard={onRemoveCard}
          />
        ))}
      </ScrollList>
    </Root>
  );
};
