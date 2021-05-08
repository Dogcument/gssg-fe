// To set expo entry js file
import { registerRootComponent } from 'expo';
import * as Font from 'expo-font';

import * as React from 'react';
import { StatusBar } from 'react-native';

// screen component
import LogoScreen from './Logo/LogoScreen';
import MainScreen from './Main/MainScreen';

import AsyncStorage from '@react-native-community/async-storage';
import { UserInfo } from './Common/CommonMethod'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isNewbie: false
    };
  }

  // show Logo in 3000ms. (3Sec)
  componentDidMount = async () => {
    await Font.loadAsync(
      {
        title: require('../assets/fonts/BMEULJIROTTF.ttf'),
        SpoqaBold: require('../assets/fonts/SpoqaHanSansNeo-Bold.ttf'),
        SpoqaMedium: require('../assets/fonts/SpoqaHanSansNeo-Medium.ttf'),
        SpoqaRegular: require('../assets/fonts/SpoqaHanSansNeo-Regular.ttf')
      },
    );

    this.GetIsNewbie();
  }

  GetIsNewbie = async () => {
    const nickname = await AsyncStorage.getItem("Nickname");
    const comment =  await AsyncStorage.getItem("Comment");

    let userInfo = new UserInfo();
    userInfo.SetInfo(nickname, comment);

    this.state.isNewbie = nickname == null;
    setTimeout(() => { this.setState({ isLoading: false }) }, 3000);
  }

  render() {
    StatusBar.setBarStyle('dark-content', true);
    if (this.state.isLoading) {
      return <LogoScreen signUp={false} />
    } else {
      if (this.state.isNewbie) {
        return <LogoScreen signUp={true} />
      } else {
        return <MainScreen />
      }
    }
  }
}

registerRootComponent(App);