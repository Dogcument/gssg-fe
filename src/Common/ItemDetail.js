import * as React from "react";
import { Text, View, Image } from "react-native";
import { styles } from "./Styles";
import UserInfo from "./UserInfo";
import { DogImages } from "../Common/Dogs";
export class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const navigation = this.props.navigation;
    navigation.setOptions({ tabBarVisible: false });
  }

  render() {
    const selectedDog = this.props.selectedDog;
    const userInfo = UserInfo.get();
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
            }}
          >
            {this.props.content}
          </Text>
          <Text
            style={{
              fontSize: 10,
              textAlign: "center",
              marginTop: 15,
              fontFamily: "SCThin",
            }}
          >
            {this.props.writingTime}
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
            source={DogImages[selectedDog]}
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
              <Text style={{ fontFamily: "SCBold" }}>
                {userInfo.getNickName()}
              </Text>
              <Text style={{ fontFamily: "SCRegular", fontSize: 13 }}>
                {userInfo.getComment()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
