import * as React from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import { MyPageItem } from "./MyPageItem";
import { styles } from "./Styles";
import { callApiToken } from "../Common/ApiHelper";
import UserInfo from "../Common/UserInfo";
import { AlarmImg, GearImg } from "../../assets/ImageList";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { DogImages } from "../Common/Dogs";

let posts = null;
export class MyPageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
    };

    this.reqGetMyPosts();
  }

  componentDidMount() {
    const navigation = this.props.navigation;
    navigation.setOptions({ tabBarVisible: true });
  }

  reqGetMyPosts = async () => {
    const userInfo = UserInfo.instance;
    const resp = await callApiToken(
      "my/posts" + "?" + "page=" + 0 + "&" + "size=" + 100,
      "GET",
      userInfo.getJwt(),
      null
    );
    if (resp == null) {
      alert("posts GET 실패!");
      return;
    }

    this.onGetMyPostsSuccess(resp);
  };

  onGetMyPostsSuccess(resp) {
    posts = resp.posts;
    this.setState({ isLoad: true });
  }

  showPosts(post) {
    return (
      <MyPageItem
        post={post}
        key={post.createdAt}
        navigation={this.props.navigation}
      />
    );
  }

  renderUserProfile = (writingNum) => {
    const userInfo = UserInfo.instance;
    const selectedDog = userInfo.getDog();
    return (
      <View style={[styles.profileContainer]}>
        <View
          style={{
            flexDirection: "row",
            flex: 7,
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
            flex: 3,
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
  };

  render() {
    if (!this.state.isLoad) {
      return <ScrollView></ScrollView>;
    }

    const margin = getStatusBarHeight();
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            marginTop: margin,
            backgroundColor: "#ae9784",
            width: "100%",
            height: "8.5%",
            borderBottomWidth: 1,
            borderBottomColor: "#ae9784",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontFamily: "SCBold",
              fontSize: 18.5,
              paddingLeft: 15,
              color: "#FFFFFF",
            }}
          >
            마이페이지
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.FacebookStyle, { marginRight: 5 }]}
              activeOpacity={0.5}
              onPress={() => alert("개발중입니다.")}
            >
              <Image style={{ width: 20, height: 20 }} source={AlarmImg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.FacebookStyle, { marginRight: 20 }]}
              activeOpacity={0.5}
              onPress={() => OnSettingButtonClicked(this.props.navigation)}
            >
              <Image style={{ width: 20, height: 20 }} source={GearImg} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Fixed Line */}
        <View>
          {/* <MyPageProfile writingNum={posts.length} /> */}
          {this.renderUserProfile(posts.length)}
        </View>
        {/* Fixed Line */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {posts.map((value) => this.showPosts(value))}
        </ScrollView>
      </View>
    );
  }
}
function OnSettingButtonClicked(navigation) {
  return navigation.navigate("Setting");
}
