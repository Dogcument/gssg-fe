// To set expo entry js file
import { registerRootComponent } from "expo";

import * as React from "react";
import { StatusBar } from "react-native";

// screen component
import AuthScreen from "./Auth/AuthScreen";
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    StatusBar.setBarStyle("dark-content", true);
    return <AuthScreen/>;
  }
}

registerRootComponent(App);
