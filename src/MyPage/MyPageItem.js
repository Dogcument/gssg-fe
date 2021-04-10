import * as React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { styles } from './Styles';
import moment from 'moment';

export class MyPageItem extends React.Component {
  render() {
    const writingTimeEpoch = Number(this.props.writingTime);
    const writingTime = moment(writingTimeEpoch).format('YYYY.MM.DD HH:mm');
    const content = this.props.content;
    const navigation = this.props.navigation;
    return (
      <TouchableOpacity
        style={[styles.itemContainer]}
        onPress={() => OnMyPageItemClicked(navigation, writingTime, content)}>
        <View
          style={{ height : 40, width : 40, marginLeft : 5,
          backgroundColor : '#ae9784', borderRadius : 100,
          justifyContent : 'center', alignItems : 'center' }}>
          <Text style={{ fontFamily : 'title' }}>
            번호
          </Text>
        </View>
        <Text style={{ marginLeft : 10, fontFamily : 'content', flex : 1 }}>
          글감
        </Text>
        <Text style={[styles.text, { marginLeft : 10, fontSize : 10 }]}>
          {writingTime || 'WritingTime'}
        </Text>
        <Image style={{ height: 15, width: 15, marginLeft : 5, marginRight: 10 }}
          source={require('./Images/7_Bone.png')}>
        </Image>
        <Image style={{ height: 15, width: 15, marginRight: 10 }}
          source={require('./Images/9_Chat.png')}>
        </Image>
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
