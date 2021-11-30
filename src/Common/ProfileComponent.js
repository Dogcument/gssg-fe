import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { DogImages } from "./Dogs";
import { styles } from "../Cabinet/Styles";

export class ProfileComponent extends React.Component {
  moveToProfilePage() {
    const navigation = this.props.navigation;
    alert("프로필페이지로 이동");
  }

  onClicked() {
    this.moveToProfilePage();
  }

  render() {
    const dogIndex = this.props.dogIndex;
    return (
      <TouchableOpacity onPress={() => this.onClicked()}>
        <Image
          style={[styles.ImageIconStyle]}
          source={DogImages[dogIndex]}
        ></Image>
      </TouchableOpacity>
    );
  }
}
