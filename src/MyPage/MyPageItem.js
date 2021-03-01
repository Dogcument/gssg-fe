import * as React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Styles';

export class MyPageItem extends React.Component {
  render() {
    const writingTime = this.props.writingTime;
    const content = this.props.content;
    const navigation = this.props.navigation;
    return (
      <View
        style={styles.itemContainer}
        onPress={() => OnMyPageItemClicked(navigation, writingTime, content)}>
        <Text style={[styles.text, { flex: 1 }]}>
          {writingTime || 'WritingTime'}
        </Text>
        <Text style={[styles.text, { flex: 1 }]}>
          {content || 'Content'}
        </Text>
      </View>
    );
  }
}

function OnMyPageItemClicked(navigation, writingTime, content) {
  console.log("CabinetItem Clicked");
  navigation.navigate('CabinetItemDetail', {
    writingTime: writingTime,
    content: content
  });
}
