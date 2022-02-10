import * as React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MyPageItem } from "../MyPage/MyPageItem";
import { callApi, callApiToken } from "../Common/ApiHelper";
import UserInfo from "../Common/UserInfo";
import { Dogs, DogImages, ServerDogs, getDogIndexByServerDogName } from "../Common/Dogs";

let modifiedNickname = "";
let modifiedDog = "";
let modifiedIntro = "";

let originNickname = "";
let originDog = "";
let originIntro = "";

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
    {
      originNickname = this.state.nickname;
      modifiedNickname = originNickname;

      originDog = resp.profileDog;
      modifiedDog = originDog;

      originIntro = resp.introduce;
      modifiedIntro = originIntro;
    }

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

  onTextChanged(newIntro) {
    modifiedIntro = newIntro;
  }

  onEditButtonClicked() {
    this.setState({ isEditMode: !this.state.isEditMode });
  }

  reqPatchMy = async () => {
    if (
      modifiedIntro == originIntro &&
      modifiedDog == originDog &&
      modifiedNickname == originNickname
    ) {
      alert("변경 사항이 없습니다.");
      return;
    }

    const userInfo = UserInfo.instance;
    const resp = await callApiToken(
      "my",
      "PATCH",
      userInfo.getJwt(),
      JSON.stringify({
        nickname: modifiedNickname,
        profileDogType: modifiedDog,
        introduce: modifiedIntro,
      })
    );
    if (resp == null) {
      alert("my PATCH 실패");
      return;
    }

    this.reqUserInfo(userInfo.getNickName());
    console.log(resp);
  };

  onApplyButtonClicked() {
    this.reqPatchMy();
    this.setState({ isEditMode: false });
  }

  // TODO
  // render dog select page
  // github #38
  renderEditUserProfile = () => {
    const selectedDog = getDogIndexByServerDogName(this.state.dog);
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.writingFollowerContainer}>
            <Text style={styles.writingFollower}>Writing</Text>
            <Text style={styles.statusNum}>{posts.length}</Text>
          </View>
          <Image
            style={styles.dogImage}
            resizeMode="contain"
            source={DogImages[selectedDog]}
          />
          <View style={styles.writingFollowerContainer}>
            <Text style={styles.writingFollower}>Follower</Text>
            <Text style={styles.statusNum}>0</Text>
          </View>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.nickname}>{this.state.nickname}</Text>
          <TextInput
            style={styles.intro}
            placeholder={this.state.intro}
            onChangeText={(inputText) => this.onTextChanged(inputText)}
          ></TextInput>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={() => this.onEditButtonClicked()}>
              <Text> 취소😳 </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onApplyButtonClicked()}>
              <Text> 적용😘 </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  renderUserProfile = () => {
    const selectedDog = getDogIndexByServerDogName(this.state.dog);
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.writingFollowerContainer}>
            <Text style={styles.writingFollower}>Writing</Text>
            <Text style={styles.statusNum}>{posts.length}</Text>
          </View>
          <Image
            style={styles.dogImage}
            resizeMode="contain"
            source={DogImages[selectedDog]}
          />
          <View style={styles.writingFollowerContainer}>
            <Text style={styles.writingFollower}>Follower</Text>
            <Text style={styles.statusNum}>0</Text>
          </View>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.nickname}>{this.state.nickname}</Text>
          <Text style={styles.intro}>{this.state.intro}</Text>
          <TouchableOpacity onPress={() => this.onEditButtonClicked()}>
            <Text>프로필 편집</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  onDogSelected(dogIndex) {
    modifiedDog = ServerDogs[dogIndex];
    this.setState({ dog: modifiedDog });
  }

  renderDogSelect = () => {
    return (
      <View style={styles.dogSelectContainer}>
        <ScrollView
          horizontal={false}
          style={{
            flexDirection: "column",
            backgroundColor: "#d4d4d4",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              padding: 5,
            }}
          >
            {Dogs.map((_value, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.onDogSelected(index)}
              >
                <Image
                  source={DogImages[index]}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  render() {
    if (!this.state.isLoad) {
      return <ScrollView></ScrollView>;
    }

    return (
      <View style={{ flexDirection: "column", width: "100%", height: "100%" }}>
        {/* Fixed Line */}
        <View>
          {this.state.isEditMode
            ? this.renderEditUserProfile()
            : this.renderUserProfile()}
        </View>
        <View>
          {/* Fixed Line */}
          {this.state.isEditMode ? (
            this.renderDogSelect()
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {posts.map((value) => this.showPosts(value))}
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}
function OnSettingButtonClicked(navigation) {
  return navigation.navigate("Setting");
}

const styles = StyleSheet.create({
  container: {
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
  },
  profileContainer: {
    flexDirection: "row",
    flex: 7,
    marginLeft: "2.5%",
    marginRight: "2.5%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  writingFollowerContainer: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
  },
  writingFollower: {
    fontFamily: "SCBold",
    fontSize: 12,
    marginBottom: 5,
    color: "#FFFFFF",
  },
  statusNum: {
    fontFamily: "SCThin",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  dogImage: {
    height: "80%",
    width: "90%",
    flex: 6,
  },
  userInfoContainer: {
    width: " 90%",
    marginLeft: "5%",
    marginTop: "7.5%",
    flexDirection: "column",
    flex: 3,
    alignItems: "center",
  },
  nickname: {
    fontFamily: "SCBold",
    marginLeft: 10,
    fontSize: 20,
    color: "#FFFFFF",
  },
  intro: {
    fontFamily: "SCThin",
    textAlign: "center",
    marginLeft: 10,
    marginTop: 5,
    fontSize: 15,
    color: "#FFFFFF",
  },
  dogSelectContainer: {
    flexDirection: "column",
    marginTop: "5%",
    marginLeft: "2.5%",
    marginRight: "2.5%",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 7.5,
      width: 7.5,
    },
    shadowRadius: 10,
  },
});
