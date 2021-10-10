import * as React from "react";
import { View } from "react-native";
import { callApiToken } from "./ApiHelper";
import UserInfo from "./UserInfo";

export class CommentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.reqReply();
  }

  reqReply = async () => {
    const id = this.props.id;
    const userInfo = UserInfo.instance;
    const resp = await callApiToken(
      "posts/" + id + "/replies",
      "GET",
      userInfo.getJwt()
    );

    const replies = resp.replies;

    // TODO
    console.log(replies);
  }

  render() {
    return <View></View>;
  }
}
