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
            <View style={{backgroundColor : '#000000', flex : 0.5}}/>
            <Text style={{ flex: 8, fontFamily: 'SpoqaBold', fontSize: 20, marginLeft : 10 }}>
              작가 등록증
            </Text>
            <TouchableHighlight style={{ flex: 0.5, marginRight : 10 }} onPress={() => props.setPopupVisible(false)}>
              <Image style={{width : 20, height : 20}}
                source={require('../Main/Images/BackButton.png')} />
            </TouchableHighlight>
          </View>

          <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'space-around', marginTop : 10 }}>
            <Text style={{ fontFamily: 'SpoqaMedium' }}>
              필명
            </Text>
            <TextInput placeholder="필명을 입력해주세요!"
              style={{ fontSize : 12, backgroundColor: '#d4d4d4', borderRadius: 5, width: '60%', height : '23%' }} />
            <Text style={{ fontFamily: 'SpoqaMedium' }}>
              한 줄 소개
            </Text>
            <TextInput placeholder="간단한 설명을 해주세요!"
              style={{ fontSize : 12, backgroundColor: '#d4d4d4', borderRadius: 5, width: '100%', height : '23%' }} />
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
    marginTop : '120%', marginLeft : '10%',
    borderRadius : 10
  }
});