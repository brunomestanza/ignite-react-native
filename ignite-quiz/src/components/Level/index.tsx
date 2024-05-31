import { Pressable, PressableProps } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { THEME } from '../../styles/theme';
import { styles } from './styles';
import { useEffect } from 'react';

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
}

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
}

const PressableAnimated = Animated.createAnimatedComponent(Pressable)

export function Level({ title, type = 'EASY', isChecked = false, ...rest }: Props) {
  const COLOR = TYPE_COLORS[type];
  const scale = useSharedValue(1)
  const checked = useSharedValue(1)
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(checked.value, [0, 1], ['transparent', COLOR])
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    return  {
      color: interpolateColor(checked.value, [0, 1], [COLOR, THEME.COLORS.GREY_100])
    }
  })

  function onPressIn() {
    scale.value = withSpring(1.1)
  }

  function onPressOut() {
    scale.value = 1
  }

  useEffect(() => {
    checked.value = withSpring(isChecked ? 1 : 0)
  }, [isChecked])

  return (
    <PressableAnimated
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.container, animatedContainerStyle, { borderColor: COLOR }]}
      {...rest}
    >
      <Animated.Text style={[styles.title, animatedTextStyle]}>
        {title}
      </Animated.Text>
    </PressableAnimated>
  );
}