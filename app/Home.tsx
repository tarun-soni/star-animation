import LikeButton from '@/components/LikeButton';
import { useState } from 'react';
import { View } from 'react-native';

type TAction = {
  id: number;
  isHeartSelected: boolean;
  isStarSelected: boolean;
};

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

export default Home;
