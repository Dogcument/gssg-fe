import React from "react";
import { render } from "react-dom";
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const Popup = props => {
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View style={styles.modalBackground}>
        <View style={{ margin: 5, flex : 1 }}>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent : 'center' }}>
            <View style={{flex: 0.5, backgroundColor: '#000000', marginLeft : 5, marginRight : 10}}>
            </View>
            <Text style={{ flex: 8, fontFamily: 'SpoqaBold', fontSize: 20 }}>
              작가 등록증
            </Text>
            <TouchableHighlight style={{ flex: 0.5 }} onPress={() => props.setPopupVisible(false)}>
              <Text>-></Text>
            </TouchableHighlight>
          </View>

          <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'space-around', marginTop : 10 }}>
            <Text style={{ fontFamily: 'SpoqaMedium' }}>
              필명
            </Text>
            <TextInput style={{ backgroundColor: '#FFFFFF', borderRadius: 5, width: '60%' }}>

            </TextInput>
            <Text style={{ fontFamily: 'SpoqaMedium' }}>
              한 줄 소개
            </Text>
            <TextInput style={{ backgroundColor: '#FFFFFF', borderRadius: 5, width: '60%' }}>

            </TextInput>
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
    backgroundColor: "#70F2BD",
  },
  modal: {
    backgroundColor: '#ae9784',
    width: "80%",
    height: "20%"
  }
});