import * as React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { getDogIndexByServerDogName } from "../Common/Dogs";
import {
  BoneSelectImg,
  BoneNoSelectImg,
  ChatImg,
} from "../../assets/ImageList";
import { getLocalizedTimeString } from "../Common/CommonMethod";
import { ProfileComponent } from "../Common/ProfileComponent";

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
        style={{
          backgroundColor: "#FFFFFF",
          width: "95%",
          height: 200,
          flexDirection: "column",
          borderWidth: 1,
          borderColor: "#ae9784",
          justifyContent: "space-between",
          marginTop: 5,
          marginBottom: 5,
          marginLeft: "2.5%",
          shadowColor: "#000000",
          shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
        }}
        onPress={() => OnCabinetItemClicked(navigation, post)}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "column",
            flex: 3.5,
            marginTop: 5,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              alignItems: "flex-end",
              flexDirection: "column",
              fontFamily: "Ridi",
              marginTop: 10,
              marginLeft: 10,
              width: "95%",
              textAlign: "center",
              lineHeight: 20,
            }}
            numberOfLines={6}
            ellipsizeMode={"tail"}
          >
            {content || "Content"}
          </Text>
        </View>

        <View style={{ height: 5 }}></View>

        <View
          style={{
            flex: 2,
            justifyContent: "flex-end",
          }}
        >
          <ProfileComponent
            dogIndex={dogIndex}
            navigation={navigation}
            userName={writer.nickname}
          />
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
              source={post.like ? BoneSelectImg : BoneNoSelectImg}
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
  navigation.navigate("ItemDetailScreen", {
    navigation: navigation,
    post: post,
  });
}
