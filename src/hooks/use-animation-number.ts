import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

export const useAnimatedNumber = (
  oldValue: number,
  newValue: number,
): number | void => {
  const [result, setResult] = useState(oldValue);
  const animatedValue = useRef(new Animated.Value(oldValue)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: newValue,
      duration: 1300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, newValue, oldValue]);

  useEffect(() => {
    animatedValue.addListener(event => setResult(Math.round(event.value)));

    return (): void => animatedValue.removeAllListeners();
  }, [animatedValue]);

  return result;
};
