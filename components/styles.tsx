import { StyleSheet } from 'react-native';

export const createStyles = (logo_size: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 20,
    },
    starContainer: {
      justifyContent: 'flex-end',
      overflow: 'hidden', // Prevent image overflow
    },
    circleContainer: {
      width: logo_size * 1.5,
      height: logo_size * 1.5,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    circle: {
      position: 'absolute',
      width: logo_size * 1.5,
      height: logo_size * 1.5,
      borderRadius: logo_size,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    heartImage: {
      width: logo_size,
      height: logo_size,
      zIndex: 2,
    },
    starImage: {
      width: logo_size / 2,
      height: logo_size / 2,
      position: 'absolute',
      bottom: -5,
      right: -5,
      zIndex: 3,
    },
  });
