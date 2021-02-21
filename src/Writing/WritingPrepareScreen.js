import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './Styles'

const WritingPrepareScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>오늘의 주제~!</Text>
      <TouchableOpacity
        style={styles.FacebookStyle} activeOpacity={0.5}
        onPress={() => OnWritingButtonClicked(navigation)}>
        <Image
          style={styles.ImageIconStyle}
          source={require('./Images/WritingButton.png')} />
      </TouchableOpacity>
    </View>
  );
}

function OnWritingButtonClicked(navigation) {
  return (
    navigation.navigate('WritingScreen')
  );
}

export default WritingPrepareScreen; 
