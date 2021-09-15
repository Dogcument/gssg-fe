import * as React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { styles } from "./Styles";
import { DogImages, getDogIndexByServerDogName } from "../Common/Dogs";
import { BoneNoSelectImg, ChatImg } from "../../assets/ImageList";
import { getLocalizedTimeString } from "../Common/CommonMethod";

var subject = "";

export class CabinetItem extends React.Component {
  componentDidMount = async () => {
    subject = this.props.subject;
    this.props.navigation.setOptions({ title: subject });
  };

  render() {
    const post = this.props.post;
    const navigation = this.props.navigation;

    const writingTime = getLocalizedTimeString(post.createdAt);
    const content = post.content;
    const writer = post.member;
    const dogIndex = getDogIndexByServerDogName(writer.profileDog);

    return (
      <TouchableOpacity
        style={[styles.ItemContainer]}
        onPress={() => OnCabinetItemClicked(navigation, post)}
      >
        <View style={[styles.ItemContent]}>
          <Text
            style={[styles.ItemText]}
            numberOfLines={6}
            ellipsizeMode={"tail"}
          >
            {content || "Content"}
          </Text>
        </View>

        <View style={{ height: 5 }}></View>

        <View style={[styles.ItemProfile]}>
          <Image
            style={[styles.ImageIconStyle]}
            source={DogImages[dogIndex]}
          ></Image>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <View
              style={{
                height: "40%",
                width: 3,
                backgroundColor: "#ae9784",
                marginRight: 5,
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontFamily: "SCThin",
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                {writer.nickname}
              </Text>
              <Text style={{ fontFamily: "SCThin", fontSize: 10 }}>
                {writingTime || "WritingTime"}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Image
              style={{
                height: 20,
                width: 20,
                marginRight: 10,
                marginBottom: -15,
              }}
              source={BoneNoSelectImg}
            ></Image>
            <Image
              style={{
                height: 20,
                width: 20,
                marginRight: 10,
                marginBottom: -15,
              }}
              source={ChatImg}
            ></Image>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

function OnCabinetItemClicked(navigation, post) {
  navigation.navigate("ItemDetail", {
    navigation: navigation,
    post: post,
  });
}
