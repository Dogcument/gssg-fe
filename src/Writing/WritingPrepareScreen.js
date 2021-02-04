import * as React from 'react';
import { Button, View, Text } from 'react-native';

const WritingPrepareScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>오늘의 주제~!</Text>
      <Button
        onPress={() => OnWritingButtonClicked(navigation)}
        title="글작성(댕댕이 발바닥)"
        color="#841584"
      />
    </View>
  );
}

function OnWritingButtonClicked(navigation) {
  return (
    navigation.navigate('WritingScreen')
  );
}

export default WritingPrepareScreen; 
