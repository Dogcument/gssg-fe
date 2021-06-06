import * as React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, Image, ImageBackground } from 'react-native';
import { styles } from './Styles'
import { ProtoWritings } from "../Common/ProtoWritings"

export class WritingPrepareScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      WritingNum: 0
    }
  }

  render() {
    const subject = ProtoWritings[this.state.WritingNum];
    return (
      <ImageBackground
        source={require("./Images/10_PaperBackground.png")}
        style={{ width: "100%", height: "100%" }}>
        <View style={{ height: '15%' }}></View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
          <View
            style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '5%', paddingRight: '5%' }}>
            <TouchableHighlight>
              <Image style={{ width: 25, height: 25 }}
                source={require('../Main/Images/NextButton-reversed.png')} />
            </TouchableHighlight>
            <Text style={styles.title}>"{subject}"</Text>
            <TouchableHighlight>
              <Image style={{ width: 25, height: 25 }}
                source={require('../Main/Images/NextButton.png')} />
            </TouchableHighlight>
          </View>
          <TouchableOpacity
            style={styles.FacebookStyle} activeOpacity={0.5}
            onPress={() => OnWritingButtonClicked(this.props.navigation, subject)}>
            <Image
              style={styles.ImageIconStyle}
              source={require('./Images/1_WritingButton.png')} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

function OnWritingButtonClicked(navigation, subject) {
  return (
    navigation.navigate('WritingScreen', {
      subject: subject
    }));
}
