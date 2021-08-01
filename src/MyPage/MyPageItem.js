import * as React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { styles } from "./Styles";
import {
  BoneBlackImg,
  ChatImg,
  WritingButtonImg,
} from "../../assets/ImageList";
import moment from "moment";
import { getDogIndexByServerDogName } from "../Common/Dogs";

export class MyPageItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const post = this.props.post;
    const navigation = this.props.navigation;
    const writingTime = moment(post.createdAt).format("YYYY.MM.DD HH:mm");

    return (
      <TouchableOpacity
        style={[styles.itemContainer]}
        onPress={() =>
          OnMyPageItemClicked(navigation, post)
        }
      >
        <Image
          source={WritingButtonImg}
          style={{ marginLeft: 10, width: 25, height: 25 }}
        />
        <Text
          style={{
            marginLeft: 10,
            fontFamily: "SCBold",
            flex: 1,
            fontSize: 20,
          }}
        >
          {post.subject.name}
        </Text>
        <Text
          style={{
            marginLeft: 10,
            fontFamily: "SCThin",
            fontSize: 10,
            flex: 1,
          }}
        >
          {writingTime || "WritingTime"}
        </Text>
        <Image
          style={{ height: 15, width: 15, marginLeft: 5, marginRight: 5 }}
          source={BoneBlackImg}
        ></Image>
        <View style={{ width: "5%" }}>
          <Text style={{ fontFamily: "SCThin", fontSize: 10 }}>0</Text>
        </View>
        <Image
          style={{ height: 15, width: 15, marginRight: 5 }}
          source={ChatImg}
        ></Image>
        <View style={{ width: "5%", marginRight: 10 }}>
          <Text style={{ fontFamily: "SCThin", fontSize: 10 }}>0</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

function OnMyPageItemClicked(navigation, post) {
  navigation.navigate("ItemDetail", {
    navigation: navigation,
    post: post,
  });
}
