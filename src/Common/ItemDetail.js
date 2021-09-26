import * as React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./Styles";
import { DogImages, getDogIndexByServerDogName } from "../Common/Dogs";
import { getLocalizedTimeString } from "./CommonMethod";
import {
  BoneSelectImg,
  BoneNoSelectImg,
  ChatImg,
} from "../../assets/ImageList";
import { callApiToken } from "./ApiHelper";
import UserInfo from "./UserInfo";

export class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: false,
    };
  }

  componentDidMount() {
    const navigation = this.props.navigation;
    navigation.setOptions({ tabBarVisible: false });
  }

  onLikeButtonClicked = async () => {
    const id = this.props.post.id;
    const userInfo = UserInfo.instance;
    const resp = await callApiToken(
      "posts/" + id + "/like",
      "POST",
      userInfo.getJwt()
    );

    if (resp == null) {
      alert("좋아요 실패!");
      return;
    }

    // TODO
    // resp should be boolean
    const isLike = resp;
    this.onLikeResp(isLike);
  };

  onLikeResp(isLike) {
    this.setState({ isLike: isLike });
  }

  onCommentButtonClicked() {
    const navigation = this.props.navigation;
    navigation.navigate("Comment", {
      id: this.props.post.id
    });
  }

  render() {
    const post = this.props.post;
    const writingTime = getLocalizedTimeString(post.createdAt);
    const writer = post.member;
    const dogIndex = getDogIndexByServerDogName(writer.profileDog);

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flex: 9,
            textAlign: "center",
            justifyContent: "center",
            marginLeft: "5%",
            width: "90%",
          }}
        >
          <Text
            style={{
              fontFamily: "Ridi",
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            {post.content}
          </Text>
          <Text
            style={{
              fontSize: 10,
              textAlign: "center",
              marginTop: 15,
              fontFamily: "SCThin",
            }}
          >
            {writingTime}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={[styles.ImageStyle, { marginLeft: 15, marginRight: 15 }]}
            source={DogImages[dogIndex]}
          />
          <View
            style={([styles.profileView], { flexDirection: "row", flex: 1 })}
          >
            <View
              style={{
                height: 40,
                width: 3,
                backgroundColor: "#ae9784",
                marginRight: 5,
              }}
            ></View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: 5,
              }}
            >
              <Text style={{ fontFamily: "SCBold" }}>{writer.nickname}</Text>
              <Text style={{ fontFamily: "SCThin", fontSize: 13 }}>
                {writer.introduce}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ width: 20, height: 20, marginRight: 15 }}
            activeOpacity={0.5}
            onPress={() => this.onLikeButtonClicked()}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={
                post.like || this.state.isLike ? BoneSelectImg : BoneNoSelectImg
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 20, height: 20, marginRight: 15 }}
            activeOpacity={0.5}
            onPress={() => this.onCommentButtonClicked()}
          >
            <Image style={{ width: 20, height: 20 }} source={ChatImg} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
