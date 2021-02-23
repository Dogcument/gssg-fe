import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './Styles';

export class CabinetItem extends React.Component {
  render() {
    const writingTime = this.props.writingTime;
    const content = this.props.content;
    const navigation = this.props.navigation;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => OnCabinetItemClicked(navigation, writingTime, content)}>
        <Text style={[styles.text, { flex: 1 }]}>
          {writingTime || 'WritingTime'}
        </Text>
        <Text style={[styles.text, { flex: 1 }]}>
          {content || 'Content'}
        </Text>
      </TouchableOpacity>
    );
  }
}

function OnCabinetItemClicked(navigation, writingTime, content) {
  console.log("CabinetItem Clicked");
  navigation.navigate('CabinetItemDetail', {
    writingTime: writingTime,
    content: content
  });
}
