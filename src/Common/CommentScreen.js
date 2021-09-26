import * as React from "react";
import { View } from "react-native";

export class CommentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.reqReply();
  }

  reqReply() {
    const id = this.props.id;
    console.log(id);
  }

  render() {
    return <View></View>;
  }
}
