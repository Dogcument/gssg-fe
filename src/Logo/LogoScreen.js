import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ImageBackground } from "react-native";
import Popup from '../Popup/PopupSelectNickname';

export default class LogoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewbie: props.IsNewbie
        };
    }
    setPopupVisible = value => {
        this.setState({
            isNewbie: { value }
        });
    }

    render() {
        return (
            <NavigationContainer>
                <Popup visible={this.state.isNewbie} setPopupVisible={this.setPopupVisible}/>
                <ImageBackground
                    source={require("./Images/1_Logo.png")}
                    style={{ width: "100%", height: "100%" }}>
                </ImageBackground>
            </NavigationContainer>
        );
    }
}
