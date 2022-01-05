import * as React from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import { MyPageItem } from "../MyPage/MyPageItem";
import { styles } from "../MyPage/Styles";
import { callApi, callApiToken } from "../Common/ApiHelper";
import UserInfo from "../Common/UserInfo";
import { AlarmImg, GearImg } from "../../assets/ImageList";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { DogImages } from "../Common/Dogs";

let posts = null;
export class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // userinfo
      nickname: this.props.userName,
      intro: null,
      dog: null,

      // state
      isLoad: false,
    };

    if (this.props.userName == null) {
      alert("ProfileScreen: this.props.userName is null");
      return;
    }
    
    this.reqUserInfo(this.state.nickname);
  }

  componentDidMount() {
    const navigation = this.props.navigation;
    navigation.setOptions({ tabBarVisible: true });
  }

  reqUserInfo = async (nickname) => {
    const resp = await callApi(
      "member/info?" + "nickname=" + nickname,
      "GET",
      null
    );
    if (resp == null) {
      alert("member/info GET 실패!");
      return;
    }

    this.onRespUserInfo(resp);
  }

  onRespUserInfo(resp) {
    this.state.intro = resp.introduce;
    this.state.dog = resp.profileDog;
    this.reqGetPosts(this.state.nickname);
  }

  reqGetPosts = async (nickname) => {
    const userInfo = UserInfo.instance;

    var resp = null;
    if (userInfo.getNickName() == nickname) {
      resp = await callApiToken(
        "my/posts" + "?" + "page=" + 0 + "&" + "size=" + 100,
        "GET",
        userInfo.getJwt(),
        null
      );
      if (resp == null) {
        alert("posts GET 실패!");
        return;
      }
    } else {
      resp = await callApiToken(
        "member/post/" +
          "?" +
          "nickname=" +
          nickname +
          "&" +
          "size=" +
          100,
        "GET",
        null
      );
      if (resp == null) {
        alert("posts GET 실패!");
        return;
      }
    }

    this.onRespGetPosts(resp);
  };

  onRespGetPosts(resp) {
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
    const selectedDog = this.state.dog;
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
            {this.state.nickname}
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
            {this.state.intro}
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
        {/* <View
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
        </View> */}

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
