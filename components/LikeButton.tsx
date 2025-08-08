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

const LOGO_SIZE = 30;
const styles = createStyles(LOGO_SIZE);

const LikeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const lastTapRef = useRef<number>(0);

  // Animation values using react-native-reanimated
  const starContainerAnim = useSharedValue(0);
  const heartScaleAnim = useSharedValue(1);
  const heartTranslateXAnim = useSharedValue(0);
  const circleScaleAnim = useSharedValue(1);
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
      } else {
        // Stop any in-flight animations so opening feels crisp
        cancelAnimation(heartScaleAnim);
        cancelAnimation(heartTranslateXAnim);
        cancelAnimation(circleScaleAnim);

        // Opening: reverse of merge — bubble flares, circle micro-bounces, heart emerges
        heartScaleAnim.value = withSequence(
          withTiming(0.98, { duration: 70, easing: Easing.out(Easing.quad) }),
          withTiming(0.98, { duration: 70, easing: Easing.out(Easing.quad) }),
          withTiming(1.01, { duration: 45, easing: Easing.out(Easing.quad) }),
          withTiming(1.02, { duration: 45, easing: Easing.out(Easing.quad) }),
          withTiming(1.01, { duration: 45, easing: Easing.out(Easing.quad) }),
          withTiming(1.06, {
            duration: 90,
            easing: Easing.out(Easing.back(1.05)),
          }),
          withTiming(1, { duration: 90, easing: Easing.out(Easing.cubic) })
        );

        // Tiny left nudge then settle with micro correction
        heartTranslateXAnim.value = withSequence(
          withTiming(-10, {
            duration: 70,
            easing: Easing.out(Easing.back(1.0)),
          }),
          withTiming(0, { duration: 120, easing: Easing.out(Easing.cubic) }),
          withTiming(1, { duration: 35, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 50, easing: Easing.out(Easing.cubic) })
        );

        // Circle quick mini-bounce instead of micro-bounce hence updating values accordingly
        circleScaleAnim.value = withSequence(
          withTiming(1.3, {
            duration: 80,
            easing: Easing.out(Easing.back(1.0)),
          }),
          withTiming(1.08, {
            duration: 60,
            easing: Easing.out(Easing.back(1.0)),
          }),
          withTiming(1, { duration: 90, easing: Easing.out(Easing.cubic) })
        );
      }
    },
    [heartScaleAnim, heartTranslateXAnim, circleScaleAnim]
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

  // Auto-close functionality with better user action prioritization
  useEffect(() => {
    if (isOpen) {
      // Clear any existing timeout to reset the timer

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout for auto-close after 3 seconds (increased for better UX)
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        animateStarContainer(0);
        animateHeartBounce(true);
      }, 2000);
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
  }, [isOpen, animateStarContainer, animateHeartBounce]);

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

  const handleHeartPress = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (lastTapRef.current && now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap detected - unselect and close client immediately
      setIsSelected(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Ensure client/star container is closed with closing animation
      setIsOpen(false);
      animateStarContainer(0);
      animateHeartBounce(true);

      lastTapRef.current = 0; // Reset to prevent triple tap
    } else {
      // Single tap - normal behavior
      lastTapRef.current = now;
      handlePress();
    }
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

      <View style={styles.actionsContainer}>
        <Text style={styles.actionText}>Required Actions</Text>
        <Text style={styles.actionText}>1. Single tap - opens client</Text>
        <Text style={styles.actionText}>
          2. Single tap - opens client and click client to mark it as liked
        </Text>
        <Text style={styles.actionText}>
          3. Double tap - unselect and close client (if selected)
        </Text>

        <Text style={styles.actionText}>
          4. Single tap - Client Auto Close after 2 seconds
        </Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
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
                <Image
                  source={starNotFilled}
                  style={{ width: 35, height: 35 }}
                />
              )}

              <Text
                maxFontSizeMultiplier={1}
                style={{
                  fontSize: 10,
                }}
              >
                Client
              </Text>
            </Animated.View>
          </View>
        </Pressable>

        {/* circle button */}
        <Pressable style={[styles.circleContainer]} onPress={handleHeartPress}>
          {/* Bubble effect layer behind the circle */}
          <Animated.View
            style={[
              styles.bubbleEffect,

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
    </View>
  );
};

export default LikeButton;
