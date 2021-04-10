import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './Styles';
import moment from 'moment';

export class MyPageItem extends React.Component {
  render() {
    const writingTimeEpoch = Number(this.props.writingTime);
    const writingTime = moment(writingTimeEpoch).format('YYYY.MM.DD HH:MM');
    const content = this.props.content;
    const navigation = this.props.navigation;
    return (
      <TouchableOpacity
        style={[styles.itemContainer]}
        onPress={() => OnMyPageItemClicked(navigation, writingTime, content)}>
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

function OnMyPageItemClicked(navigation, writingTime, content) {
  navigation.navigate('MyPageItemDetail', {
    writingTime: writingTime,
    content: content
  });
}
