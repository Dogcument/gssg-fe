import * as React from "react";
import { View, Text, Image } from "react-native";
import UserInfo from "../Common/UserInfo";
import { styles } from "./Styles";
import { DogImages } from "../Common/Dogs";

export class MyPageProfile extends React.Component {
  render() {
    const userInfo = UserInfo.get();
    const selectedDog = userInfo.getDog();
    const writingNum = this.props.writingNum;

    return (
      <View style={[styles.profileContainer]}>
        <View
          style={{
            flexDirection: "row",
            flex: 7.5,
            marginLeft: "2.5%",
            marginRight: "2.5%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{ flex: 2, flexDirection: "column", alignItems: "center" }}
          >
            <Text
              style={{
                fontFamily: "SCBold",
                fontSize: 12,
                marginBottom: 5,
                color: "#FFFFFF",
              }}
            >
              Writing
            </Text>
            <Text
              style={{
                fontFamily: "SCThin",
                fontSize: 20,
                fontWeight: "bold",
                color: "#FFFFFF",
              }}
            >
              {writingNum}
            </Text>
          </View>
          <Image
            style={([styles.profileImageStyle], { flex: 6 })}
            resizeMode="contain"
            source={DogImages[selectedDog]}
          />
          <View
            style={{ flex: 2, flexDirection: "column", alignItems: "center" }}
          >
            <Text
              style={{
                fontFamily: "SCBold",
                fontSize: 12,
                marginBottom: 5,
                color: "#FFFFFF",
              }}
            >
              Follower
            </Text>
            <Text
              style={{
                fontFamily: "SCThin",
                fontSize: 20,
                fontWeight: "bold",
                color: "#FFFFFF",
              }}
            >
              0
            </Text>
          </View>
        </View>
        <View
          style={{
            width: " 90%",
            marginLeft: "5%",
            marginTop: "7.5%",
            flexDirection: "column",
            flex: 2.5,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "SCBold",
              marginLeft: 10,
              fontSize: 20,
              color: "#FFFFFF",
            }}
          >
            {userInfo.getNickName()}
          </Text>
          <Text
            style={{
              fontFamily: "SCThin",
              marginLeft: 10,
              marginTop: 5,
              fontSize: 15,
              color: "#FFFFFF",
            }}
          >
            {userInfo.getComment()}
          </Text>
        </View>
      </View>
    );
  }
}
