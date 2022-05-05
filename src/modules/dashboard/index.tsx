import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Routes, RoutesParams } from 'src/navigation/routes';
import {
  getLastOpenIndexCardStorage,
  setLastOpenIndexCardStorage,
} from 'src/tools';
import { CardsContext, TransactionsContext } from 'src/hooks';

import { CardCarousel } from './card-carousel';
import { Transactions } from './transactions';

const Root = styled(SafeAreaView)`
  flex: 1;
`;
const CardCarouselWrapper = styled(View)`
  flex: 1;
`;
const TransactionsWrapper = styled(View)`
  flex: 2;
  padding-top: 4px;
`;

export const Dashboard = () => {
  const navigation = useNavigation<RoutesParams>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

  const { isLoading: isCardsLoading, cards } = useContext(CardsContext);

  const cardsRef = useRef(cards);
  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  // use specific and unique index of card in storage
  const { currentTransactionsList, setTransactionsForCardIndex } =
    useContext(TransactionsContext);

  // first card to display
  const [firstCarouselIndex, setFirstCarouselIndex] = useState(0);

  const onAddTransaction = useCallback(
    (index: number) => {
      navigation.navigate(Routes.ModalAddTransaction, {
        cardIndex: index,
      });
    },
    [navigation],
  );

  const getCarouselIndexByCardIndex = useCallback((cardIndex: number) => {
    let result = 0;
    cardsRef.current.find((item, indexInList) => {
      if (item.index === cardIndex) {
        result = indexInList;
        return true;
      }
    });

    return result;
  }, []);

  // get index of last number
  const init = useCallback(async () => {
    const lastOpenIndex = await getLastOpenIndexCardStorage();

    // may be card was removed
    const isLastOpenIndexActual = Boolean(
      cardsRef.current.find(card => card.index === lastOpenIndex),
    );

    if (isLastOpenIndexActual) {
      setTransactionsForCardIndex(lastOpenIndex);
      const carouselIndex = getCarouselIndexByCardIndex(lastOpenIndex);
      setFirstCarouselIndex(carouselIndex);
      setActiveCarouselIndex(carouselIndex);
    } else {
      const nowFirstCardIndex = cardsRef.current?.[0]?.index || 0;
      setTransactionsForCardIndex(nowFirstCardIndex);
      setLastOpenIndexCardStorage(nowFirstCardIndex);

      setFirstCarouselIndex(0);
    }

    setIsLoading(false);
  }, [getCarouselIndexByCardIndex, setTransactionsForCardIndex]);

  useEffect(() => {
    if (isCardsLoading) {
      return;
    }

    init();
  }, [init, isCardsLoading]);

  const onSnapToItem = useCallback(
    (orderIndex: number) => {
      const cardIndex = cards[orderIndex]?.index;
      setActiveCarouselIndex(orderIndex);
      setTransactionsForCardIndex(cardIndex);
      setLastOpenIndexCardStorage(cardIndex);
    },
    [setTransactionsForCardIndex, cards],
  );

  return (
    <Root>
      {!isLoading && !isCardsLoading && (
        <>
          <CardCarouselWrapper>
            <CardCarousel
              cards={cards}
              firstItem={firstCarouselIndex}
              activeCarouselIndex={activeCarouselIndex}
              onSnapToItem={onSnapToItem}
              onAddTransaction={onAddTransaction}
            />
          </CardCarouselWrapper>

          <TransactionsWrapper>
            <Transactions transactionsList={currentTransactionsList} />
          </TransactionsWrapper>
        </>
      )}
    </Root>
  );
};
