import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { createStyles } from './styles';

const CIRCLE_COLOR = '#0456534D';
const CIRCLE_COLOR_NOT_SELECTED = '#C4C4C4';
// const CIRCLE_COLOR_NOT_SELECTED = '#C4C4C44D';
// #0456534D

const LOGO_SIZE = 30;
const styles = createStyles(LOGO_SIZE);

const LikeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  // Animation values using react-native-reanimated
  const starContainerAnim = useSharedValue(0);
  const heartScaleAnim = useSharedValue(1);
  const heartTranslateXAnim = useSharedValue(0);
  const circleScaleAnim = useSharedValue(1);
  const bubbleOpacityAnim = useSharedValue(0);
  const bubbleScaleAnim = useSharedValue(0.5);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animateStarContainer = useCallback(
    (toValue: number) => {
      const isClosing = toValue === 0;

      if (isClosing) {
        starContainerAnim.value = withSpring(0, {
          damping: 10,
          stiffness: 320,
          mass: 0.3,
        });
      } else {
        starContainerAnim.value = withSequence(
          withSpring(1.1, { damping: 10, stiffness: 320, mass: 0.3 }),
          withSpring(0.75, { damping: 12, stiffness: 280, mass: 0.4 }),
          withSpring(1.08, { damping: 14, stiffness: 240, mass: 0.5 }),
          withSpring(0.8, { damping: 16, stiffness: 200, mass: 0.6 }),
          withSpring(1.02, { damping: 18, stiffness: 180, mass: 0.7 }),
          withSpring(1, { damping: 22, stiffness: 280, mass: 0.8 })
        );
      }
    },
    [starContainerAnim]
  );

  const animateHeartBounce = useCallback(
    (isClosing: boolean) => {
      if (isClosing) {
        // Stop any in-flight animations so we don't overshoot after close
        cancelAnimation(heartScaleAnim);
        cancelAnimation(heartTranslateXAnim);
        cancelAnimation(circleScaleAnim);
        cancelAnimation(bubbleOpacityAnim);
        cancelAnimation(bubbleScaleAnim);

        // Heart merge: quick overshoot + ultra-fast micro-oscillation, then settle
        heartScaleAnim.value = withSequence(
          withTiming(1.22, {
            duration: 110,
            easing: Easing.out(Easing.back(1.1)),
          }),
          withTiming(0.98, { duration: 100, easing: Easing.out(Easing.quad) }),
          withTiming(1.02, { duration: 45, easing: Easing.out(Easing.quad) }),
          withTiming(0.995, { duration: 45, easing: Easing.out(Easing.quad) }),
          withTiming(1, { duration: 70, easing: Easing.out(Easing.cubic) })
        );

        // Bouncy sideways movement with more pronounced effect
        // Quick nudge right + tiny micro-wiggle, then settle to center
        heartTranslateXAnim.value = withSequence(
          withTiming(10, {
            duration: 90,
            easing: Easing.out(Easing.back(1.1)),
          }),
          withTiming(0, { duration: 120, easing: Easing.out(Easing.cubic) }),
          withTiming(2, { duration: 40, easing: Easing.out(Easing.quad) }),
          withTiming(-1, { duration: 40, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 60, easing: Easing.out(Easing.cubic) })
        );

        // Circle bubble effect: quick expansion + ultra-fast micro-oscillation, then settle
        circleScaleAnim.value = withSequence(
          withTiming(1.2, {
            duration: 110,
            easing: Easing.out(Easing.back(1.1)),
          }),
          withTiming(0.99, { duration: 90, easing: Easing.out(Easing.quad) }),
          withTiming(1.03, { duration: 45, easing: Easing.out(Easing.quad) }),
          withTiming(0.995, { duration: 45, easing: Easing.out(Easing.quad) }),
          withTiming(1, { duration: 70, easing: Easing.out(Easing.cubic) })
        );

        // Bubble opacity effect - appear then fade out quickly on close
        bubbleOpacityAnim.value = withSequence(
          withTiming(0.5, { duration: 120, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 260, easing: Easing.out(Easing.cubic) })
        );

        // Bubble scale effect: expand + ultra-fast micro-oscillation, then settle
        bubbleScaleAnim.value = withSequence(
          withTiming(1.6, { duration: 110, easing: Easing.out(Easing.quad) }),
          withTiming(0.98, { duration: 90, easing: Easing.out(Easing.quad) }),
          withTiming(1.05, { duration: 45, easing: Easing.out(Easing.quad) }),
          withTiming(1, { duration: 60, easing: Easing.out(Easing.cubic) })
        );
      } else {
        // Opening animation - slightly reduced overshoot
        heartScaleAnim.value = withSequence(
          withTiming(0.65, {
            duration: 100,
            easing: Easing.in(Easing.back(1.0)),
          }),
          withSpring(1.2, { damping: 8, stiffness: 580, mass: 0.3 }),
          withSpring(0.9, { damping: 9, stiffness: 480, mass: 0.4 }),
          withSpring(1.08, { damping: 10, stiffness: 420, mass: 0.5 }),
          withSpring(0.98, { damping: 12, stiffness: 320, mass: 0.6 }),
          withSpring(1, { damping: 20, stiffness: 240, mass: 0.8 })
        );

        // Gentle return to center with bounce
        heartTranslateXAnim.value = withSpring(0, {
          damping: 15,
          stiffness: 300,
          mass: 0.8,
        });

        // Circle animation for opening
        circleScaleAnim.value = withSequence(
          withTiming(0.8, {
            duration: 100,
            easing: Easing.in(Easing.back(1.1)),
          }),
          withSpring(1.2, { damping: 8, stiffness: 500, mass: 0.4 }),
          withSpring(0.95, { damping: 10, stiffness: 400, mass: 0.5 }),
          withSpring(1, { damping: 15, stiffness: 300, mass: 0.8 })
        );

        // Reset bubble effects
        bubbleOpacityAnim.value = withTiming(0, { duration: 100 });
        bubbleScaleAnim.value = withTiming(0.5, { duration: 100 });
      }
    },
    [
      heartScaleAnim,
      heartTranslateXAnim,
      circleScaleAnim,
      bubbleOpacityAnim,
      bubbleScaleAnim,
    ]
  );

  // Animated styles
  const starContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            starContainerAnim.value,
            [0, 1],
            [50, -10] // Slide in from right
          ),
        },
        {
          scale: interpolate(
            starContainerAnim.value,
            [0, 1],
            [0, 1] // Scale up animation
          ),
        },
      ],
      opacity: starContainerAnim.value,
    };
  });

  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: heartScaleAnim.value },
        { translateX: heartTranslateXAnim.value },
      ],
    };
  });

  const circleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: circleScaleAnim.value }],
    };
  });

  const bubbleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: bubbleOpacityAnim.value,
      transform: [{ scale: bubbleScaleAnim.value }],
    };
  });

  // Auto-close functionality with better user action prioritization
  useEffect(() => {
    if (isOpen) {
      // Clear any existing timeout to reset the timer

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout for auto-close after 3 seconds (increased for better UX)
      // timeoutRef.current = setTimeout(() => {
      //   setIsOpen(false);
      //   animateStarContainer(0);
      //   animateHeartBounce(true);
      // }, 3000);
    } else {
      // Clear timeout when manually closed
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, animateStarContainer]);

  // Handle press with improved user action prioritization
  const handlePress = () => {
    // Always clear existing timeout first - user action takes priority
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    animateStarContainer(newIsOpen ? 1 : 0);

    const isClosing = !newIsOpen;
    // Always animate heart on any press (independent of open/close)
    animateHeartBounce(isClosing);
  };

  const handleClientPress = () => {
    setIsSelected(!isSelected);
    handlePress();
  };

  const heartNotFilled = require('../assets/images/heart-not-filled.png');
  const heartFilled = require('../assets/images/heart-filled.png');

  const starFilled = require('../assets/images/star-filled.png');
  const starNotFilled = require('../assets/images/star-not-filled.png');

  return (
    <View style={styles.container}>
      {/* client button */}

      <Pressable onPress={handleClientPress}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Animated.View
            style={[styles.starContainer, starContainerAnimatedStyle]}
          >
            {isSelected ? (
              <Image source={starFilled} style={{ width: 35, height: 35 }} />
            ) : (
              <Image source={starNotFilled} style={{ width: 35, height: 35 }} />
            )}

            <Text style={{ fontSize: 12 }}>Client</Text>
          </Animated.View>
        </View>
      </Pressable>

      {/* circle button */}
      <Pressable style={[styles.circleContainer]} onPress={handlePress}>
        {/* Bubble effect layer behind the circle */}
        <Animated.View
          style={[
            styles.bubbleEffect,
            bubbleAnimatedStyle,
            {
              backgroundColor: CIRCLE_COLOR + '30', // 30% opacity
            },
          ]}
        />

        <Animated.View
          style={[
            styles.circle,
            circleAnimatedStyle,
            {
              borderColor: isSelected
                ? CIRCLE_COLOR
                : isOpen || isSelected
                ? CIRCLE_COLOR
                : CIRCLE_COLOR_NOT_SELECTED,
            },
          ]}
        >
          <Animated.View style={heartAnimatedStyle}>
            <Image
              source={isSelected ? heartFilled : heartNotFilled}
              style={[styles.heartImage]}
            />
          </Animated.View>
        </Animated.View>
        {isSelected && <Image source={starFilled} style={styles.starImage} />}
      </Pressable>
    </View>
  );
};

export default LikeButton;
