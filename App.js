import * as React from 'react';

// screen component
import LogoScreen from './Logo/LogoScreen';
import MainScreen from './Main/MainScreen';

export default class extends React.Component {
  state = {
    isLoading: true
  }

  // show Logo in 3000ms. (3Sec)
  componentDidMount = async () => {
    setTimeout(() => { this.setState({ isLoading: false }) }, 3000);
  }

  render() {
    if(this.state.isLoading) {
      return <LogoScreen/>
    } else {
      return <MainScreen/>
    }
  }
}
