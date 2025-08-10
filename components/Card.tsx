import { Text, View, ViewStyle } from 'react-native';

const Card = ({
  title = 'title',
  icon = null,
  description = 'some description',
}: {
  title?: string;
  icon?: any;
  description?: string;
}) => {
  const GRADIENT_LENGTH = 20;

  const commonGradientStyles: ViewStyle = {
    position: 'absolute',
    zIndex: 0,
    width: 350 / 2,
    height: 350 / 2,
    marginTop: GRADIENT_LENGTH,

    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 40,
    shadowRadius: 40,
    shadowOpacity: 1,
  };

  return (
    <View
      style={{
        width: 350,
        height: 300,

        padding: 20,
        borderRadius: 16,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 40,
          alignSelf: 'center',
          zIndex: 10,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          color: 'white',
          fontSize: 40,
          zIndex: 10,
        }}
      >
        {description}
      </Text>

      <View
        style={{
          position: 'absolute',
          zIndex: 2,
          width: 350,
          height: 300,
        }}
      >
        <View
          style={{
            zIndex: 1,
            width: 350,
            height: 300,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#232527',
            borderWidth: 1,
            borderColor: 'black',
            padding: 20,
            borderRadius: 16,
          }}
        ></View>

        <View
          style={{
            ...commonGradientStyles,

            marginRight: -150,
            shadowColor: '#2E3E3C',
            shadowOffset: {
              width: -50,
              height: 100,
            },
          }}
        />

        <View
          style={{
            ...commonGradientStyles,

            alignSelf: 'center',
            marginLeft: -150,
            backgroundColor: 'black',

            shadowColor: '#344352',
            shadowOffset: {
              width: 50,
              height: 100,
            },
          }}
        />
      </View>
    </View>
  );
};

export default Card;
