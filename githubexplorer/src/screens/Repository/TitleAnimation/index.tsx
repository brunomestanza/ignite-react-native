import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSharedValue, withRepeat, withTiming, useAnimatedStyle } from 'react-native-reanimated';

import { Container, TitleContainer, Title } from './styles';

interface TitleAnimationProps {
  children: string;
}

export function TitleAnimation({ children }: TitleAnimationProps) {
const { width } = useWindowDimensions();

  const contentOffset = useSharedValue(0)
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    triggerTitleAnimation();
  }, [textWidth])

  function triggerTitleAnimation() {
    const textOverflowPx = textWidth - width + 136;

    if (textOverflowPx <= 0) {
      return;
    }

    contentOffset.value = -5;

    contentOffset.value = withRepeat(withTiming((textOverflowPx + 5), {
      duration: 2000 + 15 * textOverflowPx
    }), -1, true);
  }

  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -contentOffset.value }],
    }
  });

  return (
    <Container>
      <TitleContainer
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(contentWidth) => {
          if (textWidth !== 0)
            return;

          setTextWidth(contentWidth);
        }}
      >
        <Title style={titleAnimatedStyle}>
          {children}
        </Title>
      </TitleContainer>
    </Container>
  )
}