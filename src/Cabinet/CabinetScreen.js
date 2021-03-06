import React from "react";
import { ScrollView, TouchableOpacity, Text, View, Image } from "react-native";
import Modal from "react-native-modal";
import { CabinetItem } from "./CabinetItem";
import { ProtoWritings } from "../Common/ProtoWritings";
import { callApiToken } from "../Common/ApiHelper";
import {
  ArrowDownImg,
  CloseCircleImg,
  CabinetIconImg,
} from "../../assets/ImageList";
import UserInfo from "../Common/UserInfo";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { SortingTypeEnum, getSortingTypeText } from "../Common/CommonMethod";

const ModalTypeEnum = {
  None: 0,
  WritingSubject: 1,
  Sorting: 2,
};

let posts = null;
export class CabinetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      subject: props.subject,
      visibleModal: ModalTypeEnum.None,
      sortingType: SortingTypeEnum.Like,
    };

    this.reqGetPosts(this.state.sortingType);
  }

  componentDidMount() {
    const navigation = this.props.navigation;
    navigation.setOptions({ tabBarVisible: true });
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
          fontFamily: "Ridi",
          fontSize: 15,
          paddingLeft: 5,
          textAlign: "center",
          color: "AE9784",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );

  renderSortingMenus = () => {
    return (
      <View
        style={{
          fontFamily: "Ridi",
          backgroundColor: "#FFFFFF",
          width: "80%",
          marginLeft: "10%",
          height: "60%",
          borderRadius: 5,
          padding: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ visibleModal: ModalTypeEnum.None })}
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
            ????????? ???
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          key={2}
          style={{ height: 40 }}
          onPress={() => this.onSortingTypeClicked(SortingTypeEnum.Time)}
        >
          <Text style={{ fontFamily: "SCBold", textAlign: "center" }}>
            ?????? ???
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderWritingContent() {
    return (
      <View
        style={{
          fontFamily: "Ridi",
          backgroundColor: "#FFFFFF",
          width: "80%",
          marginLeft: "10%",
          height: "60%",
          borderRadius: 5,
          padding: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ visibleModal: ModalTypeEnum.None })}
          >
            <Image
              style={{ width: 20, height: 20, margin: -5 }}
              source={CloseCircleImg}
              position="absolute"
            ></Image>
          </TouchableOpacity>
        </View>

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
    this.setState({ visibleModal: ModalTypeEnum.None });
  }

  onSortingTypeClicked(sortingType) {
    this.state.sortingType = sortingType;
    this.state.visibleModal = ModalTypeEnum.None;
    this.reqGetPosts(sortingType);
  }

  reqGetPosts = async (sortType) => {
    const userInfo = UserInfo.instance;
    var sortTypeStr;
    switch (sortType) {
      case SortingTypeEnum.Like:
        sortTypeStr = "LIKE_COUNT";
        break;
      case SortingTypeEnum.Time:
        sortTypeStr = "ID";
        break;
    }

    const resp = await callApiToken(
      "posts" + "?" + "size=" + 100 + "&" + "sortType=" + sortTypeStr,
      "GET",
      userInfo.getJwt()
    );

    if (resp == null) {
      alert("posts GET ??????!");
      return;
    }

    this.onGetPostsSuccess(resp);
  };

  onGetPostsSuccess(resp) {
    posts = resp.posts;
    if (posts != undefined) {
      this.setState({ isLoad: true });
    }
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

    const margin = getStatusBarHeight();
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View
          style={{
            marginTop: margin,
            backgroundColor: "#FFFFFF",
            width: "100%",
            height: "8.5%",
            borderBottomWidth: 1,
            borderBottomColor: "#CCCCCC",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 5, justifyContent: "flex-start" }}>
            <Image
              style={{ height: 35, width: 35, marginLeft: 10 }}
              source={CabinetIconImg}
            />
          </View>
          <View style={{ flexDirection: "row", marginRight: 10, flex: 5 }}>
            <View
              style={{
                paddingRight: 3,
                marginRight: 10,
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              {this.renderRightSideButton(this.state.subject, () =>
                this.setState({ visibleModal: ModalTypeEnum.WritingSubject })
              )}
            </View>
            <View
              style={{
                paddingRight: 3,
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              {this.renderRightSideButton(
                getSortingTypeText(this.state.sortingType),
                () => this.setState({ visibleModal: ModalTypeEnum.Sorting })
              )}
            </View>
          </View>
        </View>
        <ScrollView>{posts.map((value) => this.showPosts(value))}</ScrollView>

        <Modal
          isVisible={this.state.visibleModal === ModalTypeEnum.WritingSubject}
        >
          {this.renderWritingContent()}
        </Modal>

        <Modal isVisible={this.state.visibleModal === ModalTypeEnum.Sorting}>
          {this.renderSortingMenus()}
        </Modal>
      </View>
    );
  }
}
