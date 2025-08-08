import { Platform, StyleSheet } from 'react-native';

const makeShadow = (
  androidElevation: number,
  ios: {
    color?: string;
    opacity?: number;
    radius?: number;
    offset?: { width: number; height: number };
  } = {}
) => {
  const iosColor = ios.color ?? '#000000';
  const iosOpacity = ios.opacity ?? 0.2;
  const iosRadius = ios.radius ?? 12;
  const iosOffset = ios.offset ?? { width: 0, height: 8 };

  return Platform.select({
    ios: {
      shadowColor: iosColor,
      shadowOpacity: iosOpacity,
      shadowRadius: iosRadius,
      shadowOffset: iosOffset,
    },
    android: {
      elevation: androidElevation,
    },
    default: {},
  });
};

export const createStyles = (logo_size: number) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: 'auto',

      marginVertical: 10,
    },

    starContainer: {
      width: logo_size * 2,
      height: logo_size * 2,
      borderColor: '#D5FCDB',
      // Do not clip on Android, or elevation shadows won't render
      borderWidth: 1,
      borderRadius: logo_size,
      alignItems: 'center',
      backgroundColor: '#D5FCDB',

      ...(makeShadow(12, {
        color: '#000000',
        opacity: 0.18,
        radius: 18,
        offset: { width: 0, height: 10 },
      }) as object),
    },
    circleContainer: {
      width: logo_size * 1.5,
      height: logo_size * 1.5,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'visible',

      marginTop: 5,
    },

    circle: {
      position: 'absolute',
      width: logo_size * 1.5,
      height: logo_size * 1.5,
      borderRadius: logo_size,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },
    heartImage: {
      width: logo_size,
      height: logo_size,
    },
    starImage: {
      width: logo_size / 1.5,
      height: logo_size / 1.5,
      position: 'absolute',
      bottom: -2,
      right: -10,
    },
    bubbleEffect: {
      position: 'absolute',
      width: logo_size * 1.5,
      height: logo_size * 1.5,
      borderRadius: logo_size,
      zIndex: 1,
    },
  });
