import React, { useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { CardFromStorageType } from 'src/types';
import { normVert, colors } from 'src/theme';
import { NoDataMessage } from 'src/ui';

import { CarouselItem } from './card-carousel-item';

const sliderWidth = Dimensions.get('window').width;
const sliderHeight = Dimensions.get('window').height;

const noCardsMessage = `There are no cards yet
You can add them on the settings screen`;

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
  activeCarouselIndex: number;
  onAddTransaction: (index: number) => void;
  onSnapToItem: (index: number) => void;
};
export const CardCarousel = ({
  cards,
  firstItem,
  activeCarouselIndex,
  onSnapToItem,
  onAddTransaction,
}: Props) => {
  const [carouselRef, setCarouselRef] = useState<any>(); // has so complex type

  const renderItem = useCallback(
    ({ item }: { item: CardFromStorageType }): React.ReactElement => (
      <CarouselItem item={item} onAddTransaction={onAddTransaction} />
    ),
    [onAddTransaction],
  );

  if (!cards.length) {
    return <NoDataMessage funnyEmojiText="◑.◑" message={noCardsMessage} />;
  }

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
          activeDotIndex={activeCarouselIndex}
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
