import * as React from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { MyPageItem } from "../MyPage/MyPageItem";
import { callApi, callApiToken } from "../Common/ApiHelper";
import UserInfo from "../Common/UserInfo";
import { DogImages, getDogIndexByServerDogName } from "../Common/Dogs";

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

      // edit mode
      isEditMode: false,
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
  };

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
        "member/post/" + "?" + "nickname=" + nickname + "&" + "size=" + 100,
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

  onEditButtonClicked() {
    this.setState({ isEditMode: !this.state.isEditMode });
  }

  renderEditUserProfile = () => {
    const selectedDog = getDogIndexByServerDogName(this.state.dog);
    return (
      <View
        style={{
          width: "100%",
          height: 300,
          padding: 10,
          flexDirection: "column",
          backgroundColor: "#ae9784",
          borderWidth: 0.5,
          borderColor: "#ae9784",
          borderRightWidth: 0,
          borderLeftWidth: 0,
          borderTopWidth: 0,
          elevation: 3,
          shadowColor: "#000000",
          shadowOpacity: 0.4,
          shadowOffset: { width: 3, height: 3 },
          shadowRadius: 3,
        }}
      >
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
              {posts.length}
            </Text>
          </View>
          <Image
            style={{
              height: "80%",
              width: "90%",
              flex: 6,
            }}
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
          <TouchableOpacity onPress={() => this.onEditButtonClicked()}>
            <Text>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderUserProfile = () => {
    const selectedDog = getDogIndexByServerDogName(this.state.dog);
    return (
      <View
        style={{
          width: "100%",
          height: 300,
          padding: 10,
          flexDirection: "column",
          backgroundColor: "#ae9784",
          borderWidth: 0.5,
          borderColor: "#ae9784",
          borderRightWidth: 0,
          borderLeftWidth: 0,
          borderTopWidth: 0,
          elevation: 3,
          shadowColor: "#000000",
          shadowOpacity: 0.4,
          shadowOffset: { width: 3, height: 3 },
          shadowRadius: 3,
        }}
      >
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
              {posts.length}
            </Text>
          </View>
          <Image
            style={{
              height: "80%",
              width: "90%",
              flex: 6,
            }}
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
          <TouchableOpacity onPress={() => this.onEditButtonClicked()}>
            <Text>프로필 편집</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    if (!this.state.isLoad) {
      return <ScrollView></ScrollView>;
    }

    return (
      <View style={{ flex: 1 }}>
        {/* Fixed Line */}
        <View>
          {this.state.isEditMode
            ? this.renderEditUserProfile()
            : this.renderUserProfile()}
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
