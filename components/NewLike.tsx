import React from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const LOGO_SIZE = 50;
const CIRCLE_COLOR = '#FF5C5C';
const CIRCLE_COLOR_NOT_SELECTED = '#CCC';

function AnimatedButtons() {
  const [isSelected, setIsSelected] = React.useState(false);
  const heartNotFilled = require('../assets/images/heart-not-filled.png');
  const heartFilled = require('../assets/images/heart-filled.png');
  const starNotFilled = require('../assets/images/star-not-filled.png');
  const starWithTextNotFilled = require('../assets/images/star-with-text-not-filled.png');

  // Shared values
  const circleScale = useSharedValue(1);
  const starOpacity = useSharedValue(0);
  const starTranslateY = useSharedValue(10);
  const starButtonScale = useSharedValue(1);

  // Toggle heart + trigger star pop
  const handlePress = () => {
    circleScale.value = withSequence(withSpring(1.1), withSpring(1));

    runOnJS(setIsSelected)(!isSelected);

    if (!isSelected) {
      starOpacity.value = withTiming(1, { duration: 200 });
      starTranslateY.value = withTiming(0, { duration: 200 });
    } else {
      starOpacity.value = withTiming(0, { duration: 200 });
      starTranslateY.value = withTiming(10, { duration: 200 });
    }
  };

  const handleClientPress = () => {
    starButtonScale.value = withSequence(
      withSpring(0.9),
      withSpring(1, { damping: 4 })
    );
  };

  // Animated styles
  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }));

  const starAboveHeartStyle = useAnimatedStyle(() => ({
    opacity: starOpacity.value,
    transform: [{ translateY: starTranslateY.value }],
    position: 'absolute',
    top: -20,
  }));

  const starContainerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: starButtonScale.value }],
  }));

  return (
    <View style={styles.container}>
      {/* client button */}
      <Pressable onPress={handleClientPress}>
        <Animated.View
          style={[styles.starContainer, starContainerAnimatedStyle]}
        >
          <Image
            source={starWithTextNotFilled}
            style={{ width: LOGO_SIZE * 1.5, height: LOGO_SIZE * 1.5 }}
          />
        </Animated.View>
      </Pressable>

      {/* circle button */}
      <Pressable style={[styles.circleContainer]} onPress={handlePress}>
        <Animated.View
          style={[
            styles.circle,
            heartAnimatedStyle,
            {
              borderColor: isSelected
                ? CIRCLE_COLOR
                : CIRCLE_COLOR_NOT_SELECTED,
            },
          ]}
        >
          <Image
            source={isSelected ? heartFilled : heartNotFilled}
            style={styles.heartImage}
          />
          {isSelected && (
            <Animated.Image
              source={starNotFilled}
              style={[styles.starImage, starAboveHeartStyle]}
            />
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heartImage: {
    width: 40,
    height: 40,
  },
  starImage: {
    width: 20,
    height: 20,
  },
});

export default function NewLike() {
  return <AnimatedButtons />;
}
