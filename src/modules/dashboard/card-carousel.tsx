import React, { useCallback, Dispatch, useState } from 'react';
import { Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { setLastOpenIndexCard } from 'src/tools';
import { CardFromStorageType } from 'src/types';
import { normVert, colors } from 'src/theme';

import { CarouselItem } from './card-carousel-item';

const sliderWidth = Dimensions.get('window').width;
const sliderHeight = Dimensions.get('window').height;

const containerStyle = {
  backgroundColor: 'transparent',
  paddingVertical: 0,
};

const dotStyle = {
  width: normVert(5),
  height: normVert(5),
  borderRadius: 100,
  marginHorizontal: 0,
  backgroundColor: colors.primary,
};
const inactiveDotStyle = {
  backgroundColor: colors.black,
};

type Props = {
  cards: CardFromStorageType[];
  firstItem: number;
  currentCardIndex: number;
  activeCarouselItemIndex: number;
  onAddTransaction: (index: number) => void;
  setCurrentCardIndex: Dispatch<React.SetStateAction<number>>;
  setActiveCarouselItemIndex: Dispatch<React.SetStateAction<number>>;
};
export const CardCarousel = ({
  cards,
  firstItem,
  activeCarouselItemIndex,
  setCurrentCardIndex,
  onAddTransaction,
  setActiveCarouselItemIndex,
}: Props) => {
  const [carouselRef, setCarouselRef] = useState<any>(); // has so complex type

  const onSnapToItem = useCallback(
    (orderIndex: number) => {
      setActiveCarouselItemIndex(orderIndex);

      const cardIndex = cards[orderIndex]?.index;
      setCurrentCardIndex(cardIndex);
      setLastOpenIndexCard(cardIndex);
    },
    [cards, setCurrentCardIndex, setActiveCarouselItemIndex],
  );

  const renderItem = useCallback(
    ({ item }: { item: CardFromStorageType }): React.ReactElement => (
      <CarouselItem item={item} onAddTransaction={onAddTransaction} />
    ),

    [onAddTransaction],
  );

  return (
    <>
      <Carousel
        data={cards}
        ref={setCarouselRef}
        layout={'stack'}
        loop
        firstItem={firstItem}
        onSnapToItem={onSnapToItem}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={sliderWidth}
        sliderHeight={sliderHeight}
        itemHeight={sliderHeight}
      />

      {carouselRef && (
        <Pagination
          carouselRef={carouselRef}
          dotsLength={cards.length}
          activeDotIndex={activeCarouselItemIndex}
          containerStyle={containerStyle}
          dotStyle={dotStyle}
          tappableDots
          inactiveDotStyle={inactiveDotStyle}
          inactiveDotScale={1}
          inactiveDotOpacity={1}
        />
      )}
    </>
  );
};
