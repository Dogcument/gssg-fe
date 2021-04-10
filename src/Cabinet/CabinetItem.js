import * as React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { styles } from './Styles';
import moment from 'moment';

export class CabinetItem extends React.Component {
  render() {
    const writingTimeEpoch = Number(this.props.writingTime);
    const writingTime = moment(writingTimeEpoch).format('YYYY.MM.DD HH:mm');
    const content = this.props.content;
    const navigation = this.props.navigation;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => OnCabinetItemClicked(navigation, writingTime, content)}>
        <View style={[styles.text, { flex: 3.5, marginTop : 5 }]}>
          <Text style={
            [styles.subtext, {
              fontFamily: 'profile',
              marginTop: 10, marginLeft: 10, width: '95%',
              textAlign: 'center'
            }]} numberOfLines={6} ellipsizeMode={'tail'}>
            {content || 'Content'}
          </Text>
        </View>
        <View style={{ height: 5 }}></View>
        <View style={[styles.content, { flex: 1.5, flexDirection: 'row' }]}>
          <Image style={styles.ImageIconStyle}
            source={require('./Images/3_Profile.png')}>
          </Image>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={{ height: '60%', width: 3, backgroundColor: '#ae9784', marginRight: 5 }} />
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontFamily: 'content', fontSize: 10, fontWeight: 'bold' }}>
                이름
              </Text>
              <Text style={{ fontFamily: 'content', fontSize: 10 }}>
                {writingTime || 'WritingTime'}
              </Text>
            </View>
          </View>
          <View style={{alignItems : 'center', flexDirection : 'row'}}>
            <Image style={{ height: 13, width: 13, marginRight: 10 }}
              source={require('./Images/7_Bone.png')}>
            </Image>
            <Image style={{ height: 13, width: 13, marginRight: 10 }}
              source={require('./Images/9_Chat.png')}>
            </Image>
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
