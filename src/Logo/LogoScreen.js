import React from 'react';
import { ImageBackground } from "react-native";

export default class Loading extends React.Component {
    render() {
        return (
            <ImageBackground
                source={require("./Logo.png")}
                style={{ width: "100%", height: "100%" }}>
            </ImageBackground>
        );
    }
}