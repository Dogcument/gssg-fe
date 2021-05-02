import React from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Image,
  ImageBackground
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TutorialScreen } from "./TutorialScreen";

export var SignUpState = {
  SetNickname: 1,
  SetDog: 2,
  ShowTutorial: 3,
}

export class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpState: SignUpState.SetNickname
    }
  }

  OnNextButtonClicked() {
    switch (this.state.signUpState) {
      case SignUpState.SetNickname:
        this.setState({ signUpState: SignUpState.SetDog });
        break;
      case SignUpState.SetDog:
        this.setState({ signUpState: SignUpState.ShowTutorial });
        break;
      case SignUpState.ShowTutorial:
        this.props.GotoMainScreen();
        break;
    }
  }

  render() {
    if (this.props.signUp) {
      switch (this.state.signUpState) {
        case SignUpState.SetNickname:
          return (
            <View style={{ width: '100%', height: '100%' }}>
              <ImageBackground source={require('../Logo/Images/1_Logo.png')} style={{ position: 'absolute', width: '100%', height: '100%' }} />
              <View style={{ width : '100%', height : '100%', backgroundColor : '#000000', opacity : 0.5}} />
              <View style={styles.modalBackground}>
                <View style={{ margin: 15, flex: 1 }}>
                  <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../Writing/Images/1_WritingButton.png')} style={{ height: 25, width: 25 }} />
                    <Text style={{ flex: 1, fontFamily: 'SpoqaBold', fontSize: 20, marginLeft: 10 }}>
                      작가 등록증
                      </Text>
                    <TouchableHighlight style={{ alignSelf: 'flex-end' }} onPress={() => this.OnNextButtonClicked()}>
                      <Image style={{ width: 25, height: 25 }}
                        source={require('../Main/Images/NextButton.png')} />
                    </TouchableHighlight>
                  </View>

                  <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'space-around', marginTop: 10 }}>
                    <Text style={{ fontFamily: 'SpoqaMedium' }}>
                      필명
                      </Text>
                    <TextInput placeholder="필명을 입력해주세요!" placeholderTextColor='#FFFFFF'
                      style={{ fontSize: 12, backgroundColor: '#d4d4d4', borderRadius: 5, width: '60%', height: '23%', paddingLeft: 5 }} />
                    <View style={{ height: 5 }}></View>
                    <Text style={{ fontFamily: 'SpoqaMedium' }}>
                      한 줄 소개
                      </Text>
                    <TextInput placeholder="간단한 설명을 해주세요!" placeholderTextColor='#FFFFFF'
                      style={{ fontSize: 12, backgroundColor: '#d4d4d4', borderRadius: 5, width: '100%', height: '23%', paddingLeft: 5 }} />
                  </View>
                </View>
              </View>
            </View>
          );
        case SignUpState.SetDog:
          return (
            <View style={{ width: '100%', height: '100%' }}>
              <ImageBackground source={require('../Logo/Images/1_Logo.png')} style={{ position: 'absolute', width: '100%', height: '100%' }} />
              <View style={{ width : '100%', height : '100%', backgroundColor : '#000000', opacity : 0.5}} />
              <View style={styles.modalBackground}>
                <View style={{ margin: 15, flex: 1, flexDirection: 'row' }}>
                  <ScrollView horizontal={false}
                    style={{ width: '65%', flexDirection: 'column', backgroundColor: '#d4d4d4', borderRadius: 10 }}>
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
                      <TouchableHighlight onPress={() => this.OnNextButtonClicked()}>
                        <Image style={{ width: 25, height: 25 }}
                          source={require('../Main/Images/NextButton.png')} />
                      </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', marginTop: -15 }}>
                      <Image source={require('../MyPage/Images/기본강아지.png')}
                        style={{ width: 80, height: 80 }} />
                      <Text style={{ fontFamily: 'SpoqaBold', fontSize: 15 }}> 강아지 </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        case SignUpState.ShowTutorial:
          // tempcode 
          return (
              <TutorialScreen>
                
              </TutorialScreen>
          );
      }
    } else {
      return (
        <ImageBackground
          source={require("../Logo/Images/1_Logo.png")}
          style={{ width: "100%", height: "100%" }}>
        </ImageBackground>
      );
    }
  }
};

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    width: '80%',
    height: '20%',
    backgroundColor: '#FFFFFF',
    borderColor: '#d4d4d4',
    marginTop: '130%', marginLeft: '10%',
    borderRadius: 10
  }
});
