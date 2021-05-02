import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ImageBackground } from "react-native";
import { SignUpScreen } from '../SignUp/SignUpScreen';
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
                    <SignUpScreen
                        visible={this.props.isNewbie}
                        GotoMainScreen={this.GotoMainScreen}
                    />
                </NavigationContainer>
            );

        }
    }
}
