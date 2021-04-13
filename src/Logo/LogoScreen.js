import React from 'react';
import { ImageBackground } from "react-native";
import {
    View,
    TouchableHighlight,
    Text
  } from "react-native";
  import Popup from './Popup';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }
    setModalVisible = value => {
        this.setState({
            modalVisible: value
        })
    }
    render(){
        return (
            <View>
                <Popup visible={this.state.modalVisible} setModalVisible={this.setModalVisible} />
                <TouchableHighlight onPress={this.setModalVisible(true)}>
                    <Text>Open Popup</Text>
                </TouchableHighlight>
            </View>
        )
    }
};

export default class Loading extends React.Component {
    render() {
        return (
            <ImageBackground
                source={require("./Images/1_Logo.png")}
                style={{ width: "100%", height: "100%" }}>
            </ImageBackground>
        );
    }
}