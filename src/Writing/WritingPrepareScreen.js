import * as React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { styles } from './Styles'
import { ProtoWritings } from "../Common/ProtoWritings"

export class WritingPrepareScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      WritingNum: 0
    }
  }

  // TODO : JIWUNG
  // Next, Prev writing button

  render() {
    return (
      <ImageBackground
        source={require("./Images/10_PaperBackground.png")}
        style={{ width: "100%", height: "100%" }}>
        <View style={{ height : '15%'}}></View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
          <Text style={styles.title}>{ProtoWritings[this.state.WritingNum]}</Text>
          <TouchableOpacity
            style={styles.FacebookStyle} activeOpacity={0.5}
            onPress={() => OnWritingButtonClicked(this.props.navigation)}>
            <Image
              style={styles.ImageIconStyle}
              source={require('./Images/1_WritingButton.png')} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

function OnWritingButtonClicked(navigation) {
  return (
    navigation.navigate('WritingScreen')
  );
}
