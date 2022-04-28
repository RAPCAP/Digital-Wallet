import AsyncStorage from '@react-native-community/async-storage';
import {
  CardItemType,
  OperationType,
  NewTransactionType,
  TransactionType,
  CardFromStorageType,
} from 'src/types';

const LAST_INDEX_KEY = 'lastIndex';
const LAST_OPEN_CARD_KEY = 'lastOpen';

const CARD_PREFIX = 'card-';
const TRANSACTION_PREFIX = 'tran-';

export const getAllKey = async () => {
  return await AsyncStorage.getAllKeys();
};

export const setLastIndexAbove = async (): Promise<number> => {
  const currentLast = await AsyncStorage.getItem(LAST_INDEX_KEY);

  const nextIndex = currentLast ? String(Number(currentLast) + 1) : '1';

  await AsyncStorage.setItem(LAST_INDEX_KEY, nextIndex);

  return Number(nextIndex);
};

export const addNewCard = async (
  value: CardItemType,
  callback?: (error?: Error, result?: string) => void,
) => {
  const index = await setLastIndexAbove();

  const data = JSON.stringify({ ...value, index, transactionsCount: 0 });

  AsyncStorage.setItem(`${CARD_PREFIX}${index}`, data, callback);
};

export const getAllCards = async (): Promise<CardFromStorageType[]> => {
  const keys = await getAllKey();

  const cardKeys = keys.filter(i => i.includes(CARD_PREFIX));

  const dataJson = await Promise.all(
    cardKeys.map(key => AsyncStorage.getItem(key)),
  );

  const data = dataJson.map(i => i && JSON.parse(i));

  return data as CardFromStorageType[];
};

export const removeCard = async (index: number) => {
  AsyncStorage.removeItem(`${TRANSACTION_PREFIX}${index}`);
  AsyncStorage.removeItem(`${CARD_PREFIX}${index}`);
};

const getCard = async (index: number): Promise<CardFromStorageType> => {
  const key = `${CARD_PREFIX}${index}`;
  const cardJSON = await AsyncStorage.getItem(key);

  //TODO
  return (cardJSON && JSON.parse(cardJSON)) as CardFromStorageType;
};

export const addTransaction = async (
  { amount, comment, operationType, index }: NewTransactionType,
  callback: (error?: Error, result?: string) => void,
) => {
  const card = await getCard(index);
  const { transactionsCount } = card;
  const indexTransaction = transactionsCount + 1;

  const transactionKey = `${TRANSACTION_PREFIX}${index}-${indexTransaction}`;

  const transactionData = {
    operationType,
    indexTransaction,
    cardIndex: index,
    amount,
    comment,
  };

  await AsyncStorage.setItem(transactionKey, JSON.stringify(transactionData));

  const cardKey = `${CARD_PREFIX}${index}`;

  const delta = operationType === OperationType.Income ? amount : amount * -1;
  const newAmount = card.amount + delta;

  const cardData = {
    ...card,
    amount: newAmount,
    transactionsCount: indexTransaction,
  };

  await AsyncStorage.setItem(cardKey, JSON.stringify(cardData), callback);
};

export const getAllTransactions = async (): Promise<TransactionType[]> => {
  const keys = await getAllKey();

  const cardKeys = keys.filter(i => i.includes(TRANSACTION_PREFIX));

  const dataJson = await Promise.all(
    cardKeys.map(key => AsyncStorage.getItem(key)),
  );

  const data = dataJson.map(i => i && JSON.parse(i));

  return data as TransactionType[];
};

export const setLastOpenIndexCard = async (index: number) => {
  await AsyncStorage.setItem(LAST_OPEN_CARD_KEY, String(index));
};

export const getLastOpenIndexCard = async (): Promise<number> => {
  return Number((await AsyncStorage.getItem(LAST_OPEN_CARD_KEY)) || 0);
};
