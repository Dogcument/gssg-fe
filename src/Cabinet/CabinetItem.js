import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export class CabinetItem extends React.Component {
  render() {
    const writingTime = this.props.writingTime;
    const content = this.props.content;
    return (
      <View style={styles.container}>
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

// Dummy Style
// Jiwung TODO
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 5
  },
  text: {
    color: 'white'
  }
});