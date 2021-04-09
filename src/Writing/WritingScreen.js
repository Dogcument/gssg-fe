import * as React from 'react';
import { View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { styles, StyleSheet } from './Styles';

var contentText = "";
var numberOfLines = 1;

export class WritingScreen extends React.Component {
  state = {
    numberOfLines: 1
  };

  render() {
    const {numberOfLines} = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={styles.TextInputStyle}
          multiline={true}
          placeholder="여기에 입력"
          returnKeyType='none'
          numberOfLines={numberOfLines}
          onChangeText={inputText => this.onChangeText(inputText)}
        />
      </View>
    );
  }

  onChangeText(inputText) {
    contentText = inputText;
  }
}

var KeyName = Date.now();
// Gunny Tempcode - Prototype
function SaveToLocalMachine() {
  AsyncStorage.setItem(KeyName, contentText, () => { });
};

export function OnDoneButtonClicked() {
  alert(KeyName + "_" + contentText);
  SaveToLocalMachine();
}
