import { useFonts } from 'expo-font';
import 'react-native-reanimated';

import LikeButton from '@/components/LikeButton';
import { View } from 'react-native';

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
          backgroundColor: '#FFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LikeButton />
        {/* <NewLike /> */}
      </View>
    </>
  );
}
