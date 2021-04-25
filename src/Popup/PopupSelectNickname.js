import React from "react";
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Image
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

const Popup = props => {
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View style={styles.modalBackground}>
        <View style={{ margin: 15, flex : 1 }}>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent : 'center', alignItems : 'center' }}>
            <Image source={require('../Writing/Images/1_WritingButton.png')} style={{ height : 25, width : 25 }} />
            <Text style={{ flex: 1, fontFamily: 'SpoqaBold', fontSize: 20, marginLeft : 10 }}>
              작가 등록증
            </Text>
            <TouchableHighlight style={{ alignSelf : 'flex-end' }} onPress={() => props.setPopupVisible(false)}>
              <Image style={{width : 25, height : 25}}
                source={require('../Main/Images/NextButton.png')} />
            </TouchableHighlight>
          </View>

          <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'space-around', marginTop : 10 }}>
            <Text style={{ fontFamily: 'SpoqaMedium' }}>
              필명
            </Text>
            <TextInput placeholder="필명을 입력해주세요!" placeholderTextColor='#FFFFFF'
              style={{ fontSize : 12, backgroundColor: '#d4d4d4', borderRadius: 5, width: '60%', height : '23%', paddingLeft : 5 }} />
            <View style={{height : 5}}></View>
            <Text style={{ fontFamily: 'SpoqaMedium' }}>
              한 줄 소개
            </Text>
            <TextInput placeholder="간단한 설명을 해주세요!" placeholderTextColor='#FFFFFF'
              style={{ fontSize : 12, backgroundColor: '#d4d4d4', borderRadius: 5, width: '100%', height : '23%', paddingLeft : 5 }} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default Popup;

const styles = StyleSheet.create({
  modalBackground: {
    width: '80%',
    height: '20%',
    backgroundColor : '#FFFFFF',
    borderColor : '#d4d4d4',
    marginTop : '130%', marginLeft : '10%',
    borderRadius : 10
  }
});