import * as React from "react";
import { Text, View, Image } from "react-native";
import { styles } from "./Styles";
import { DogImages, getDogIndexByServerDogName } from "../Common/Dogs";
import { getLocalizedTimeString } from "./CommonMethod";
export class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const navigation = this.props.navigation;
    navigation.setOptions({ tabBarVisible: false });
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
        </View>
      </View>
    );
  }
}
