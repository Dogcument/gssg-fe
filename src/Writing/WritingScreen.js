import * as React from 'react';
import { View, TextInput } from 'react-native';

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

export function OnDoneButtonClicked() {
  return (
    alert(contentText)
  );
}
