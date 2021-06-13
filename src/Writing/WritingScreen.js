import * as React from 'react';
import { View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from './Styles';

var content = "";
var subject = "";

export class WritingScreen extends React.Component {
  componentDidMount = async () => {
    subject = this.props.subject;
    this.props.navigation.setOptions({ title: subject });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '95%', marginLeft: '2.5%' }}>
          <TextInput
            style={styles.TextInputStyle}
            placeholder="여기에 입력"
            multiline={true}
            returnKeyType='default'
            onChangeText={inputText => this.onChangeText(inputText)}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  onChangeText(inputText) {
    content = inputText;
  }
}

function SaveToLocalMachine() {
  var key = "Writing";

  const item =
    String(Date.now()) + "</=/>" +
    subject + "</=/>" + 
    content + "</=/>";

  AsyncStorage.setItem(key, item, () => { /* Callback function Null */ });
};

export function OnDoneButtonClicked(navigation) {
  if (content == "") {
    alert("글 내용이 없어요!");
    return;
  }

  console.log(content);
  SaveToLocalMachine();

  return (
    navigation.navigate('보관함', { screen: 'Cabinet' })
  );
}
