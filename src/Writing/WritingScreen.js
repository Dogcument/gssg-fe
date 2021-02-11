import * as React from 'react';
import { View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

var contentText = "";
export class WritingScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          multiline={true}
          placeholder="여기에 입력"
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
  AsyncStorage.setItem(KeyName, contentText, () => {});
};

export function OnDoneButtonClicked() {
  alert(KeyName + "_" + contentText);
  SaveToLocalMachine();
}
