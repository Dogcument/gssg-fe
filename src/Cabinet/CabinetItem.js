import * as React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
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
        <View style={[styles.text, { flex: 1 }]}>
          <Text style={[styles.subtext, { flex: 1 }]}>
            {content || 'Content'}
          </Text>
          <Text style={[styles.text]}>
            {writingTime || 'WritingTime'}
          </Text>
        </View>
        <View style={styles.content}>
          <Image style={styles.ImageIconStyle}
            source={require('./Images/3_Profile.png')}>
          </Image>
          <View>
            <Text style={{fontFamily : 'content'}}>
              이름
            </Text>
            <Text style={{fontFamily : 'content'}}>
              간단한 설명
            </Text>
            <Text style={[styles.subtext]}>
              <Text style={[styles.subtext]}>뼈다귀</Text>
              <Text style={[styles.subtext]}>댓글</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity >
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
