import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { DogImages } from "./Dogs";

export class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);

    if (props.userName == null) {
      alert("ProfileComponent: `userName` props does not exist.");
      return;
    }
    if (props.navigation == null) {
      alert("ProfileComponent: `navigation` props does not exist.");
      return;
    }
    if (props.dogIndex == null) {
      alert("ProfileComponent: `dogIndex` props does not exist.");
      return;
    }
  }

  moveToProfilePage() {
    this.props.navigation.navigate("ProfileScreen", {
      navigation: this.props.navigation,
      userName: this.props.userName,
    });
  }

  onClicked() {
    this.moveToProfilePage();
  }

  render() {
    const dogIndex = this.props.dogIndex;
    return (
      <TouchableOpacity onPress={() => this.onClicked()}>
        <Image
          style={{
            height: 40,
            width: 40,
          }}
          source={DogImages[dogIndex]}
        ></Image>
      </TouchableOpacity>
    );
  }
}
