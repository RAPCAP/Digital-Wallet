import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Routes, RoutesParams } from 'src/navigation/routes';
import { getLastOpenIndexCard, getAllCards, qSortByIndex } from 'src/tools';
import { CardFromStorageType } from 'src/types';

import { CardCarousel } from './card-carousel';
import { History } from './history';

const Root = styled(SafeAreaView)`
  flex: 1;
`;

const CardCarouselWrapper = styled(View)`
  flex: 1;
`;
const HistoryWrapper = styled(View)`
  flex: 2;
`;

export const Dashboard = () => {
  const navigation = useNavigation<RoutesParams>();

  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState<CardFromStorageType[]>([]);

  const [firstCardIndex, setFirstCardIndex] = useState(0);

  const [currentCardIndex, setCurrentCardIndex] = useState(0); // use specific and unique index of card
  const [activeCarouselItemIndex, setActiveCarouselItemIndex] = useState(0); // use index of card in data

  const onAddTransaction = useCallback(
    (index: number) => {
      navigation.navigate(Routes.ModalAddTransaction, {
        cardIndex: index,
      });
    },
    [navigation],
  );

  const getCarouselIndexByCardIndex = useCallback(
    (cardIndex: number) => {
      let result = 0;
      cards.find((item, indexInList) => {
        if (item.index === cardIndex) {
          result = indexInList;
        }
      });
      return result;
    },
    [cards],
  );

  const updateCards = useCallback(() => {
    const getCards = async () => {
      const cardsData = await getAllCards();

      // source data not sorted by index
      const sortedCard = qSortByIndex(cardsData);
      const firstSortedCardIndex = sortedCard[0]?.index ?? undefined;

      //may set wrong index when returning from modal window
      if (!firstSortedCardIndex) {
        setCurrentCardIndex(firstSortedCardIndex);
      }

      setCards(sortedCard);
    };

    getCards();
  }, []);

  useEffect(() => {
    if (!cards.length) {
      return;
    }

    const setLastOpenCard = async () => {
      const lastOpenIndex = await getLastOpenIndexCard();

      const carouselIndex = getCarouselIndexByCardIndex(lastOpenIndex);
      setFirstCardIndex(carouselIndex);
      setActiveCarouselItemIndex(carouselIndex);

      setCurrentCardIndex(lastOpenIndex);
      setIsLoading(false);
    };

    setLastOpenCard();
  }, [cards, getCarouselIndexByCardIndex]);

  // AsyncStorage.clear();
  useFocusEffect(updateCards);

  return (
    <Root>
      {!isLoading && (
        <>
          <CardCarouselWrapper>
            <CardCarousel
              cards={cards}
              firstItem={firstCardIndex}
              currentCardIndex={currentCardIndex}
              setCurrentCardIndex={setCurrentCardIndex}
              onAddTransaction={onAddTransaction}
              activeCarouselItemIndex={activeCarouselItemIndex}
              setActiveCarouselItemIndex={setActiveCarouselItemIndex}
            />
          </CardCarouselWrapper>

          <HistoryWrapper>
            <History currentCardIndex={currentCardIndex} />
          </HistoryWrapper>
        </>
      )}
    </Root>
  );
};
