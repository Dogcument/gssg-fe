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
          <Text style={{ fontFamily : 'title', color : '#FFFFFF' }}>
            번호
          </Text>
        </View>
        <Text style={{ marginLeft : 10, fontFamily : 'SpoqaMedium', flex : 1, color : '#FFFFFF', fontSize : 20, fontWeight : 'bold' }}>
          글감
        </Text>
        <Text style={[styles.text, { marginLeft : 10, fontSize : 10, flex : 1 }]}>
          {writingTime || 'WritingTime'}
        </Text>
        <Image style={{ height: 15, width: 15, marginLeft : 5, marginRight: 5 }}
          source={require('./Images/7_Bone.png')}>
        </Image>
        <View style={{width : '5%'}}>
          <Text style={{ fontFamily : 'SpoqaMedium', fontSize : 10, color : '#FFFFFF' }}>
            99
          </Text>
        </View>
        <Image style={{ height: 15, width: 15, marginRight: 5 }}
          source={require('./Images/9_Chat.png')}>
        </Image>
        <View style={{width : '5%', marginRight : 10}}>
          <Text style={{ fontFamily : 'SpoqaMedium', fontSize : 10, color : '#FFFFFF' }}>
            0
          </Text>
        </View>
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
