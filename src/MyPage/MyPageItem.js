import * as React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { styles } from "./Styles";
import {
  BoneBlackImg,
  ChatImg,
  WritingButtonImg,
} from "../../assets/ImageList";
import moment from "moment";

export class MyPageItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const writingTimeEpoch = Number(this.props.writingTime);
    const writingTime = moment(writingTimeEpoch).format("YYYY.MM.DD HH:mm");
    const content = this.props.content;
    const navigation = this.props.navigation;
    const selectedDog = this.props.selectedDog;
    const subject = this.props.subject;

    return (
      <TouchableOpacity
        style={[styles.itemContainer]}
        onPress={() =>
          OnMyPageItemClicked(navigation, writingTime, content, selectedDog)
        }
      >
        <Image
          source={WritingButtonImg}
          style={{ marginLeft: 10, width: 25, height: 25 }}
        />
        <Text
          style={{
            marginTop: 3,
            marginLeft: 10,
            fontFamily: "SpoqaMedium",
            flex: 1,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {subject}
        </Text>
        <Text
          style={{
            marginLeft: 10,
            fontFamily: "SpoqaMedium",
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
          <Text style={{ fontFamily: "SpoqaMedium", fontSize: 10 }}>0</Text>
        </View>
        <Image
          style={{ height: 15, width: 15, marginRight: 5 }}
          source={ChatImg}
        ></Image>
        <View style={{ width: "5%", marginRight: 10 }}>
          <Text style={{ fontFamily: "SpoqaMedium", fontSize: 10 }}>0</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

function OnMyPageItemClicked(navigation, writingTime, content, selectedDog) {
  navigation.navigate("ItemDetail", {
    navigation: navigation,
    writingTime: writingTime,
    content: content,
    selectedDog: selectedDog,
  });
}
