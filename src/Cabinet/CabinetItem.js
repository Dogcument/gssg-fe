import * as React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './Styles';

export class CabinetItem extends React.Component {
  render() {
    const writingTime = this.props.writingTime;
    const content = this.props.content;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => console.log("CabinetItem Clicked")}>
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
