import * as React from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import { MyPageProfile } from "./MyPageProfile";
import { MyPageItem } from "./MyPageItem";
import { styles } from "./Styles";
import { callApiToken } from "../Common/ApiHelper";
import UserInfo from "../Common/UserInfo";
import {
  AlarmImg,
  GearImg,
} from "../../assets/ImageList";

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
    const userInfo = UserInfo.get();
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
    posts = resp.posts.content;
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

  render() {
    if (!this.state.isLoad) {
      return <ScrollView></ScrollView>;
    }

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
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
            style={{ fontFamily: "SCBold", fontSize: 18.5, paddingLeft: 15, color: "#FFFFFF" }}
          >
            마이페이지
          </Text>
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
                style={[styles.FacebookStyle, { marginRight: 5 }]}
                activeOpacity={0.5}
                onPress={() => alert("개발중입니다.")}
              >
                <Image style={{width: 20, height: 20}} source={AlarmImg} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.FacebookStyle, { marginRight: 20 }]}
                activeOpacity={0.5}
                onPress={() => OnSettingButtonClicked(this.props.navigation)}
              >
                <Image style={{width: 20, height: 20}} source={GearImg} />
              </TouchableOpacity>
          </View>
        </View>

        {/* Fixed Line */}
        <View>
          <MyPageProfile writingNum={posts.length} />
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