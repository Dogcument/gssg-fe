import React from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import Modal from "react-native-modal";
import { styles } from "./Styles";
import { CabinetItem } from "./CabinetItem";
import { ProtoWritings } from "../Common/ProtoWritings";
import { callApi } from "../Common/ApiHelper";

let posts = null;
export class CabinetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      subject: ProtoWritings[0],
      visibleModal: null,
    };

    this.reqGetPosts();
  }

  static onWritingsClicked = async () => {
    this.setState({ visibleModal: 1 });
  };

  componentDidMount() {
    const navigation = this.props.navigation;
    navigation.setOptions({ tabBarVisible: true });
  }

  renderSubjectButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress} style={[styles.modalbutton]}>
      <View>
        <Text style={{ fontFamily: "SCBold", fontSize: 20 }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  renderWritingContent() {
    return (
      <View style={[styles.writingContentModal]}>
        <TouchableOpacity
          onPress={() => this.setState({ visibleModal: null })}
          style={[styles.closeModalButton]}
        >
          <View>
            <Text style={{ fontFamily: "SCBold", fontSize: 20 }}>X</Text>
          </View>
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          {ProtoWritings.map((value) => (
            <TouchableOpacity
              key={value}
              style={{ height: 40 }}
              onPress={() => this.onWritingSubjectClicked(value)}
            >
              <Text style={{ fontFamily: "SCBold", textAlign: "center" }}>
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  onWritingSubjectClicked(subject) {
    console.log(subject);
    this.state.subject = subject;
    this.setState({ visibleModal: subject });
  }

  reqGetPosts = async () => {
    const resp = await callApi(
      "posts" + "?" + "page=" + 0 + "&" + "size=" + 100,
      "GET",
      null
    );
    if (resp == null) {
      alert("posts GET 실패!");
      return;
    }

    this.onGetPostsSuccess(resp);
  };

  onGetPostsSuccess(resp) {
    posts = resp.posts.content;
    this.setState({ isLoad: true });
  }

  showPosts(post) {
    const subject = post.subject.name;
    if (subject != this.state.subject) {
      return;
    }
    return (
      <CabinetItem
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
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView>
          {
            <View>
              {this.renderSubjectButton(this.state.subject, () =>
                this.setState({ visibleModal: 1 })
              )}
            </View>
          }
          {posts.map((value) => this.showPosts(value))}
        </ScrollView>

        <Modal isVisible={this.state.visibleModal === 1}>
          {this.renderWritingContent()}
        </Modal>
      </View>
    );
  }
}
