import React from "react";
import {
  Text,
  View,
  ScrollView,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Image
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Popup = props => {
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View style={styles.modalBackground}>
        <View style={{ margin: 15, flex: 1, flexDirection: 'row' }}>
          <ScrollView horizontal={false}
            style={{ width: '65%', flexDirection: 'column', backgroundColor: '#d4d4d4', borderRadius : 10 }}>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 5 }}>
              <TouchableOpacity>
                <Image source={require('../MyPage/Images/기본강아지.png')}
                  style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../MyPage/Images/불독.png')}
                  style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../MyPage/Images/사모예드.png')}
                  style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../MyPage/Images/요크.png')}
                  style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../MyPage/Images/코기.png')}
                  style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../MyPage/Images/허스키.png')}
                  style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={{ flexDirection: 'column', width: '35%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableHighlight onPress={() => props.setPopupVisible(false)}>
                <Image style={{ width: 25, height: 25 }}
                  source={require('../Main/Images/NextButton.png')} />
              </TouchableHighlight>
            </View>
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', marginTop : -15 }}>
              <Image source={require('../MyPage/Images/기본강아지.png')}
                style={{ width: 80, height: 80 }} />
              <Text style={{ fontFamily: 'SpoqaBold', fontSize: 15 }}> 강아지 </Text>
            </View>
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
    backgroundColor: '#FFFFFF',
    borderColor: '#d4d4d4',
    marginTop: '130%', marginLeft: '10%',
    borderRadius: 10
  }
});