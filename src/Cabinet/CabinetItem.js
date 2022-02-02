import * as React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import {
  BoneNoSelectImg,
  BoneSelectImg,
  ChatImg,
} from "../../assets/ImageList";
import { getLocalizedTimeString } from "../Common/CommonMethod";
import { getDogIndexByServerDogName } from "../Common/Dogs";
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
        style={style.containter}
        onPress={() => OnCabinetItemClicked(navigation, post)}
      >
        <View style={style.postContainer}>
          <Text style={style.postText} numberOfLines={6} ellipsizeMode={"tail"}>
            {content || "Content"}
          </Text>
        </View>

        <View style={style.bottomSection}>
          <View style={style.profileContainer}>
            <ProfileComponent
              dogIndex={dogIndex}
              navigation={navigation}
              userName={writer.nickname}
            />
            <View style={style.contour} />
            <View style={style.userInfo}>
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

            <View style={style.likeCommentContainer}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                source={post.like ? BoneSelectImg : BoneNoSelectImg}
              />
              <Image
                style={{
                  marginLeft: 5,
                  marginRight: 5,
                  height: 20,
                  width: 20,
                }}
                source={ChatImg}
              />
            </View>
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

const style = StyleSheet.create({
  containter: {
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
  },
  postContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    flex: 3.5,
    marginTop: 5,
    justifyContent: "center",
  },
  postText: {
    alignItems: "flex-end",
    flexDirection: "column",
    fontFamily: "Ridi",
    marginTop: 10,
    marginLeft: 10,
    width: "95%",
    textAlign: "center",
    lineHeight: 20,
  },
  bottomSection: {
    flex: 1,
    marginTop: 5,
    justifyContent: "flex-end",
  },
  contour: {
    height: "100%",
    width: 3,
    backgroundColor: "#ae9784",
    marginRight: 5,
  },
  profileContainer: {
    flexDirection: "row",
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  likeCommentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
