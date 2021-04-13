// To set expo entry js file
import { registerRootComponent } from 'expo';
import * as Font from 'expo-font';

import * as React from 'react';
import { StatusBar } from 'react-native';

// screen component
import LogoScreen from './Logo/LogoScreen';
import MainScreen from './Main/MainScreen';

class App extends React.Component {
  state = {
    isLoading: true
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
    setTimeout(() => { this.setState({ isLoading: false }) }, 3000);
  }

  render() {
    StatusBar.setBarStyle('dark-content', true);

    if (this.state.isLoading) {
      return <LogoScreen />
    } else {
      return <MainScreen />
    }
  }
}

registerRootComponent(App);