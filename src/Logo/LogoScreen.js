import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ImageBackground } from "react-native";
import Popup from '../Popup/PopupSelectNickname';
import MainScreen from '../Main/MainScreen';

export default class LogoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goMainScreen: false
        }
    }

    GotoMainScreen = value => {
        this.setState({ goMainScreen: true });
    }

    render() {
        if (this.state.goMainScreen) {
            return <MainScreen />
        } else {
            return (
                <NavigationContainer>
                    <Popup
                        visible={this.props.isNewbie}
                        GotoMainScreen={this.GotoMainScreen}
                    />
                    <ImageBackground
                        source={require("./Images/1_Logo.png")}
                        style={{ width: "100%", height: "100%" }}>
                    </ImageBackground>
                </NavigationContainer>
            );

        }
    }
}
