import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';
import { BlurMask, Canvas, Circle, Easing, Path, runTiming, Skia, useValue } from '@shopify/react-native-skia';
import { THEME } from '../../styles/theme';
import { useEffect } from 'react';

type Props = TouchableOpacityProps & {
  checked: boolean;
  title: string;
}

const CHECK_SIZE = 28
const CHECK_STROKE = 2
const RADIUS = (CHECK_SIZE - CHECK_STROKE) / 2

export function Option({ checked, title, ...rest }: Props) {
  const path = Skia.Path.Make()
  path.addCircle(CHECK_SIZE, CHECK_SIZE, RADIUS)
  const skiaPercentageValue = useValue(0)
  const skiaInnerCircleValue = useValue(0)

  if (checked) {
    runTiming(skiaPercentageValue, 1)
    runTiming(skiaInnerCircleValue, RADIUS / 2, { easing: Easing.bounce })
  } else {
    runTiming(skiaPercentageValue, 0)
    runTiming(skiaInnerCircleValue, 0)
  }

  return (
    <TouchableOpacity
      style={
        [
          styles.container,
          checked && styles.checked
        ]
      }
      {...rest}
    >
      <Text style={styles.title}>
        {title}
      </Text>

      <Canvas style={{ height: CHECK_SIZE * 2, width: CHECK_SIZE * 2 }}>
        <Path
          path={path}
          color={THEME.COLORS.GREY_500}
          style='stroke'
          strokeWidth={CHECK_STROKE}
        />
        <Path
          path={path}
          color={THEME.COLORS.BRAND_LIGHT}
          style='stroke'
          strokeWidth={CHECK_STROKE}
          start={0}
          end={skiaPercentageValue}
        >
          <BlurMask blur={1} style='solid' />
        </Path>

        <Circle
          cx={CHECK_SIZE}
          cy={CHECK_SIZE}
          r={skiaInnerCircleValue}
          color={THEME.COLORS.BRAND_LIGHT}
        >
           <BlurMask blur={4} style='solid' />
        </Circle>
      </Canvas>
    </TouchableOpacity>
  );
}