import { useFonts } from 'expo-font';
import 'react-native-reanimated';

import LikeButton from '@/components/LikeButton';
import { TAction } from '@/types/action';
import { useState } from 'react';
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
        <Home />
      </View>
    </>
  );
}

const Home = () => {
  const NUMBER_OF_BUTTONS = 8;

  const [buttonStatus, setButtonStatus] = useState<TAction[]>(
    Array.from({ length: NUMBER_OF_BUTTONS }, (_, index) => ({
      id: index,
      isHeartSelected: false,
      isStarSelected: false,
    }))
  );

  function updateButtonStatus({
    id,
    isHeartSelected,
    isStarSelected,
  }: TAction) {
    const newButtonStatus = buttonStatus.map((button) =>
      button.id === id ? { ...button, isHeartSelected, isStarSelected } : button
    );
    setButtonStatus(newButtonStatus);
  }

  return (
    <View>
      {buttonStatus.map((status, index) => (
        <LikeButton
          key={index}
          id={index}
          isHeartSelected={status.isHeartSelected}
          isStarSelected={status.isStarSelected}
          updateButtonStatus={updateButtonStatus}
        />
      ))}
    </View>
  );
};
