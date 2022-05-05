import { useCallback, useEffect, useState } from 'react';
import {
  qSortCardByIndex,
  getAllCardsStorage,
  getCardStorage,
} from 'src/tools';

import { CardFromStorageType } from 'src/types';

export type UseCardsValue = {
  isLoading: boolean;
  cards: CardFromStorageType[];
  onRemovedCard: (index: number) => void;
  updateCards: () => void;
  updateCardByIndex: (cardIndex: number) => void;
  activeCarouselIndex: number;
  setActiveCarouselIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const useCards = (): UseCardsValue => {
  const [cards, setCards] = useState<CardFromStorageType[]>([]);

  // getting cards from storage and sorting
  const [isLoading, setIsLoading] = useState(true);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

  const updateCards = useCallback(async () => {
    setIsLoading(true);
    const cardsData = await getAllCardsStorage();

    // source data not sorted by index
    const sortedCard = qSortCardByIndex(cardsData);
    setCards(sortedCard);
    setIsLoading(false);
  }, []);

  const updateCardByIndex = useCallback(async (index: number) => {
    const actualCardData = await getCardStorage(index);
    setCards(prev =>
      prev.map(card => (card.index === index ? actualCardData : card)),
    );
  }, []);

  // init
  useEffect(() => {
    updateCards();
  }, [updateCards]);

  const onRemovedCard = useCallback((index: number) => {
    setCards(prevCards => prevCards.filter(card => card.index !== index));
  }, []);

  return {
    isLoading,
    cards,
    updateCards,
    onRemovedCard,
    updateCardByIndex,
    activeCarouselIndex,
    setActiveCarouselIndex,
  };
};
