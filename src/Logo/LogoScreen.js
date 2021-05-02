import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
                        signUp={this.props.signUp}
                        GotoMainScreen={this.GotoMainScreen}
                    />
                </NavigationContainer>
            );

        }
    }
}
