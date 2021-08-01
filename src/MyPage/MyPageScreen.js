import * as React from "react";
import { View, ScrollView } from "react-native";
import { MyPageProfile } from "./MyPageProfile";
import { MyPageItem } from "./MyPageItem";
import { callApiToken } from "../Common/ApiHelper";
import UserInfo from "../Common/UserInfo";

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
        {/* Fixed Line */}
        <View>
          <MyPageProfile writingNum={posts.length} />
        </View>
        {/* Fixed Line */}
        <ScrollView>{posts.map((value) => this.showPosts(value))}</ScrollView>
      </View>
    );
  }
}
