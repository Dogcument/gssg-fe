import * as React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { styles } from './Styles';
import moment from 'moment';
import { UserInfo } from '../Common/CommonMethod'
import { DogImages } from '../Common/Dogs'
import { BoneBlackImg, ChatImg } from '../../assets/ImageList';
export class CabinetItem extends React.Component {
  render() {
    const writingTimeEpoch = Number(this.props.writingTime);
    const writingTime = moment(writingTimeEpoch).format('YYYY.MM.DD HH:mm');
    const content = this.props.content;
    const navigation = this.props.navigation;
    const userInfo = new UserInfo();
    const selectedDog = this.props.selectedDog;

    return (
      <TouchableOpacity      
        style={[styles.ItemContainer]}
        onPress={() => OnCabinetItemClicked(navigation, writingTime, content, selectedDog)}>
          <View style={[styles.ItemContent]}>
            <Text style={[styles.ItemText]} numberOfLines={6} ellipsizeMode={'tail'}>
              {content || 'Content'}
            </Text>
          </View>

          <View style={{ height: 5 }}></View>

          <View style={[styles.ItemProfile]}>
            <Image style={[styles.ImageIconStyle]}
              source={DogImages[selectedDog]}>
            </Image>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={{ height: '40%', width: 3, backgroundColor: '#ae9784', marginRight: 5 }} />
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontFamily: 'SpoqaMedium', fontSize: 10, fontWeight: 'bold' }}>
                  {userInfo.GetNickName()}
                </Text>
                <Text style={{ fontFamily: 'SpoqaMedium', fontSize: 10 }}>
                  {writingTime || 'WritingTime'}
                </Text>
              </View>
            </View>
            <View style={{alignItems : 'center', flexDirection : 'row'}}>
              <Image style={{ height: 20, width: 20, marginRight: 10, marginBottom : -15 }}
                source={BoneBlackImg}>
              </Image>
              <Image style={{ height: 20, width: 20, marginRight: 10, marginBottom : -15 }}
                source={ChatImg}>
              </Image>
            </View>
          </View>
      </TouchableOpacity >
    );
  }
}

function OnCabinetItemClicked(navigation, writingTime, content, selectedDog) {
  navigation.navigate('ItemDetail', {
    navigation: navigation,
    writingTime: writingTime,
    content: content,
    selectedDog: selectedDog
  });
}
