import * as React from 'react';
import { View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from './Styles';

var contentText = "";

export class WritingScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width : '95%', marginLeft : '2.5%' }}>
        <TextInput
          style={styles.TextInputStyle}
          placeholder="여기에 입력"
          multiline={true}
          returnKeyType='default'
          onChangeText={inputText => this.onChangeText(inputText)}
        />
      </View>
    );
  }

  onChangeText(inputText) {
    contentText = inputText;
  }
}

function SaveToLocalMachine() {
  var KeyName = String(Date.now());
  AsyncStorage.setItem(KeyName, contentText, () => { });
};

export function OnDoneButtonClicked(navigation) {
  console.log(contentText);
  SaveToLocalMachine();

  return (
    navigation.navigate('보관함', { screen: 'Cabinet' })
  );
}
