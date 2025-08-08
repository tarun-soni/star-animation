import { StyleSheet } from 'react-native';

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
      overflow: 'hidden',
      borderWidth: 1,
      borderRadius: logo_size,
      alignItems: 'center',
      backgroundColor: '#D5FCDB',
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
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
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
