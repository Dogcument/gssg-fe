import * as React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { styles } from './Styles'

const WritingPrepareScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("./Images/10_PaperBackground.png")}
      style={{ width: "100%", height: "100%" }}>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
        <Text style={styles.title}>오늘의 주제~!</Text>
        <TouchableOpacity
          style={styles.FacebookStyle} activeOpacity={0.5}
          onPress={() => OnWritingButtonClicked(navigation)}>
          <Image
            style={styles.ImageIconStyle}
            source={require('./Images/1_WritingButton.png')} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

function OnWritingButtonClicked(navigation) {
  return (
    navigation.navigate('WritingScreen')
  );
}

export default WritingPrepareScreen; 
