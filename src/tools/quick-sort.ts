import { CardFromStorageType } from 'src/types';

export const qSortByIndex = (
  cards: CardFromStorageType[],
): CardFromStorageType[] => {
  if (cards.length <= 1) {
    return cards;
  }

  const pivot = cards[0];
  const pivotIndex = cards[0].index;

  const left = [];
  const right = [];

  for (let i = 1; i < cards.length; i++) {
    cards[i].index < pivotIndex ? left.push(cards[i]) : right.push(cards[i]);
  }

  return qSortByIndex(left).concat(pivot, qSortByIndex(right));
};
