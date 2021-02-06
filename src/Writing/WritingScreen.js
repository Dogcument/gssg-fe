import * as React from 'react';
import { View, TextInput } from 'react-native';

export function WritingScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        multiline={true}
        placeholder="여기에 입력"
      />
    </View>
  );
}

export function OnDoneButtonClicked() {
  return (
    alert("글쌌다")
  )
}
