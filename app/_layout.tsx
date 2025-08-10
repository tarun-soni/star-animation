import { useFonts } from 'expo-font';
import 'react-native-reanimated';

import Card from '@/components/Card';
import { Pressable, Text, View } from 'react-native';

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#1E2022',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* <Home /> */}
        {/* <Button variant="ghost" size="lg" /> */}

        <Card />
      </View>
    </>
  );
}

type TButton = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

const Button = (props: TButton) => {
  const { size = 'md', variant = 'primary' } = props;

  const getStylesBasedOnSize = (size: string) => {
    if (size === 'sm') {
      return {
        width: 50,
        height: 50,
      };
    }

    if (size === 'md') {
      return {
        width: 75,
        height: 75,
      };
    }

    if (size === 'lg') {
      return {
        width: 100,
        height: 100,
      };
    }
  };

  const getStylesBasedOnVariant = (variant: string) => {
    if (variant === 'primary') {
      return {
        backgroundColor: 'blue',
        color: 'black',
      };
    }

    if (variant === 'secondary') {
      return {
        backgroundColor: 'yellow',
        color: 'white',
      };
    }

    if (variant === 'ghost') {
      return {
        backgroundColor: 'transparent',
        textColor: 'black',
      };
    }
  };

  const getTextStylesBasedOnVariant = (variant: string) => {
    if (variant === 'primary') {
      return {
        color: 'black',
      };
    }

    if (variant === 'secondary') {
      return {
        color: 'black',
      };
    }

    if (variant === 'ghost') {
      return {
        color: 'black',
      };
    }
  };

  const currentSize = getStylesBasedOnSize(size);
  const currentVariantStyles = getStylesBasedOnVariant(variant);

  const textColorStyles = getTextStylesBasedOnVariant(variant);
  return (
    <Pressable
      style={[
        {
          ...currentSize,
          ...currentVariantStyles,
        },
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <Text style={[{ ...textColorStyles }]}>test</Text>
    </Pressable>
  );
};
