import * as React from 'react';
import { View, TextInput } from 'react-native';

function WritingScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput>실제로 작성하는 곳</TextInput>
      </View>
    );
  }
  
export default WritingScreen; 
