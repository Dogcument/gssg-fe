import * as React from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
} from "react-native";
import { getDogIndexByServerDogName } from "./Dogs";
import { ProfileComponent } from "./ProfileComponent";
import Modal from "react-native-modal";
import { callApiToken } from "./ApiHelper";
import UserInfo from "./UserInfo";
import {
  ArrowDownImg,
  CloseCircleImg,
  BoneNoSelectImg,
  BoneSelectImg,
} from "../../assets/ImageList";
import { SortingTypeEnum, getSortingTypeText } from "../Common/CommonMethod";

let replies = null;
let comment = null;

class CommentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: this.props.like,
    };
  }

  reqCommentLike = async (id) => {
    const userInfo = UserInfo.instance;
    const resp = await callApiToken(
      "replies/" + id + "/like",
      "POST",
      userInfo.getJwt(),
      JSON.stringify({
        postId: this.props.id,
        content: comment,
      })
    );

    if (resp == null) {
      alert("resp does not exist");
    }

    this.setState({ isLike: resp });
    this.props.onCommentLikeButtonClicked();
  };

  onLikeButtonClicked() {
    const id = this.props.id;
    this.reqCommentLike(id);
  }

  render() {
    const likeCount = this.props.likeCount;
    const comment = this.props.comment;
    const nickName = this.props.nickName;
    const profileDog = this.props.profileDog;
    const dogIndex = getDogIndexByServerDogName(this.props.profileDog);
    const date = this.props.date;

    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <ProfileComponent
            dogIndex={dogIndex}
            userName={this.props.nickName}
            navigation={this.props.navigation}
          />
        </View>
        <View style={styles.comment}>
          <View style={styles.comment_top}>
            <Text>{nickName}</Text>
            <Text>{date}</Text>
          </View>
          <Text>{comment}</Text>
        </View>
        <View style={styles.like}>
          <TouchableOpacity onPress={() => this.onLikeButtonClicked()}>
            <Image
              style={{ height: 20, width: 20 }}
              source={this.state.isLike ? BoneSelectImg : BoneNoSelectImg}
            ></Image>
          </TouchableOpacity>
          <Text>{likeCount}</Text>
        </View>
      </View>
    );
  }
}

export class CommentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      respReplyFinished: false,
      visibleModal: false,
      sortingType: SortingTypeEnum.Time,
    };
    this.reqGetReply(SortingTypeEnum.Time);
  }

  reqGetReply = async (sortingType) => {
    const id = this.props.id;
    const userInfo = UserInfo.instance;
    var sortTypeStr;
    switch (sortingType) {
      case SortingTypeEnum.Like:
        sortTypeStr = "LIKE_COUNT";
        break;
      case SortingTypeEnum.Time:
        sortTypeStr = "ID";
        break;
    }

    const resp = await callApiToken(
      "posts/" + id + "/replies?" + "size=10&" + "sortType=" + sortTypeStr,
      "GET",
      userInfo.getJwt()
    );

    this.onRespGetReply(resp.replies);
  };

  reqPostReply = async () => {
    if (comment == null || comment == "") {
      alert("코멘트가 비어있습니다.");
      return;
    }

    const userInfo = UserInfo.instance;
    const resp = await callApiToken(
      "replies",
      "POST",
      userInfo.getJwt(),
      JSON.stringify({
        postId: this.props.id,
        content: comment,
      })
    );

    this.onRespPostReply(resp);
  };

  onRespPostReply(resp) {
    this.reqGetReply(this.state.sortingType);
    this.textInput.clear();
  }

  onRespGetReply(inReplies) {
    replies = inReplies;
    this.setState({ respReplyFinished: true });
  }

  showReplies(value) {
    return (
      <CommentComponent
        id={value.id}
        key={value.id}
        comment={value.content}
        likeCount={value.likeCount}
        like={value.like}
        nickName={value.member.nickname}
        profileDog={value.member.profileDog}
        date={value.createdAt}
        onCommentLikeButtonClicked={this.onCommentLikeButtonClicked}
      />
    );
  }

  onCommentLikeButtonClicked = () => {
    this.reqGetReply(this.state.sortingType);
  };

  onCommentTextChanged(text) {
    comment = text;
  }

  renderRightSideButton = (text, onPress) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingTop: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Image style={{ height: 12.5, width: 12.5 }} source={ArrowDownImg} />
      <Text
        style={{
          fontFamily: "SCBold",
          fontSize: 17.5,
          paddingLeft: 10,
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );

  onSortingTypeClicked(sortingType) {
    this.state.sortingType = sortingType;
    this.state.visibleModal = false;
    this.reqGetReply(sortingType);
  }

  renderSortingMenus = () => {
    return (
      <View style={styles.writingContentModal}>
        <View style={styles.closeModalButton}>
          <TouchableOpacity
            onPress={() => this.setState({ visibleModal: false })}
          >
            <Image
              style={{ width: 20, height: 20, margin: -5 }}
              source={CloseCircleImg}
              position="absolute"
            ></Image>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          key={1}
          style={{ height: 40 }}
          onPress={() => this.onSortingTypeClicked(SortingTypeEnum.Like)}
        >
          <Text style={{ fontFamily: "SCBold", textAlign: "center" }}>
            좋아요 순
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          key={2}
          style={{ height: 40 }}
          onPress={() => this.onSortingTypeClicked(SortingTypeEnum.Time)}
        >
          <Text style={{ fontFamily: "SCBold", textAlign: "center" }}>
            시간 순
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    if (!this.state.respReplyFinished) {
      return <View />;
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "web" ? "height" : "position"}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={{ paddingRight: 3 }}>
          {this.renderRightSideButton(
            getSortingTypeText(this.state.sortingType),
            () => this.setState({ visibleModal: true })
          )}
        </View>
        <ScrollView>
          {replies.length == 0
            ? null
            : replies.map((value) => this.showReplies(value))}
        </ScrollView>
        <View style={styles.commentInput}>
          <TextInput
            style={styles.textInput}
            ref={(input) => {
              this.textInput = input;
            }}
            placeholder="여기에 입력"
            multiline={true}
            returnKeyType="default"
            onChangeText={(inputText) => this.onCommentTextChanged(inputText)}
          />
          <TouchableOpacity
            style={styles.inputButton}
            onPress={() => this.reqPostReply()}
          >
            <Text>입 력</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={this.state.visibleModal == true}>
          {this.renderSortingMenus()}
        </Modal>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    marginBottom: 5,
  },
  profile_dog: {
    width: "100%",
  },
  profile: {
    flex: 1.25,
    justifyContent: "center",
    backgroundColor: "powderblue",
  },
  comment: {
    flexDirection: "column",
    flex: 7.5,
    backgroundColor: "skyblue",
  },
  comment_top: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  like: {
    flexDirection: "row",
    backgroundColor: "steelblue",
    justifyContent: "center",
    flex: 1.25,
  },

  writingContentModal: {
    fontFamily: "Ridi",
    backgroundColor: "#FFFFFF",
    width: "80%",
    marginLeft: "10%",
    height: "60%",
    borderRadius: 5,
    padding: 20,
  },
  closeModalButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  commentInput: {
    backfaceVisibility: "tomato",
    justifyContent: "center",
    alignItems: "center",
    height: "5%",
    flexDirection: "row",
  },
  textInput: {
    flex: 9,
  },
  inputButton: {
    flex: 1,
    backgroundColor: "lime",
  },
});
