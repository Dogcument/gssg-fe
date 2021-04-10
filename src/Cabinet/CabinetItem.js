import * as React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { styles } from './Styles';
import moment from 'moment';

export class CabinetItem extends React.Component {
  render() {
    const writingTimeEpoch = Number(this.props.writingTime);
    const writingTime = moment(writingTimeEpoch).format('YYYY.MM.DD HH:MM');
    const content = this.props.content;
    const navigation = this.props.navigation;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => OnCabinetItemClicked(navigation, writingTime, content)}>
        <View style={[styles.text, { flex : 3.5}]}>
          <Text style={
            [styles.subtext,{ fontFamily : 'content',
                              marginTop : 10, marginLeft : 10, width : '95%'}]} numberOfLines={6} ellipsizeMode={'tail'}>
            {content || 'Content'}
          </Text>
        </View>
        <View style={{height : 5}}></View>
        <View style={[styles.content, { flex : 1.5 }]}>
          <Image style={styles.ImageIconStyle}
            source={require('./Images/3_Profile.png')}>
          </Image>
          <View>
            <Text style={{fontFamily : 'content', fontSize : 10}}>
              이름
            </Text>
            <Text style={{fontFamily : 'content', fontSize : 10}}>
              {writingTime || 'WritingTime'}
            </Text>
            <Text style={[styles.subtext]}>
              <Text style={[styles.subtext, { fontSize : 10, textAlign : 'right' }]}>뼈다귀</Text>
              <Text style={[styles.subtext, { fontSize : 10, textAlign : 'right' }]}>댓글</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity >
    );
  }
}

function OnCabinetItemClicked(navigation, writingTime, content) {
  navigation.navigate('CabinetItemDetail', {
    writingTime: writingTime,
    content: content
  });
}
