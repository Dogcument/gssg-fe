import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ImageBackground,
} from "react-native";
import { styles } from "./Styles";
import { ProtoWritings } from "../Common/ProtoWritings";
import {
  NextButtonImg,
  PrevButtonImg,
  WritingButtonImg,
  PaperBackgroundImg,
} from "../../assets/ImageList";

export class WritingPrepareScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      WritingNum: 0,
    };
  }

  OnPrevButtonClicked() {
    if (this.state.WritingNum == 0) {
      return;
    }

    this.setState({ WritingNum: this.state.WritingNum - 1 });
  }

  OnNextButtonClicked() {
    if (this.state.WritingNum >= ProtoWritings.length - 1) {
      return;
    }

    this.setState({ WritingNum: this.state.WritingNum + 1 });
  }

  render() {
    const subject = ProtoWritings[this.state.WritingNum];
    return (
      <ImageBackground
        source={PaperBackgroundImg}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={{ height: "15%" }}></View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View style={{width: "100%", justifyContent: 'center', alignItems: "center"}}>
            <Text style={{ fontFamily: "Ridi" }}>오늘의 글감</Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "15%",
                paddingLeft: "5%",
                paddingRight: "5%",
              }}
            >
              <TouchableHighlight onPress={() => this.OnPrevButtonClicked()}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={PrevButtonImg}
                />
              </TouchableHighlight>
              <Text style={styles.title}>{subject}</Text>
              <TouchableHighlight onPress={() => this.OnNextButtonClicked()}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={NextButtonImg}
                />
              </TouchableHighlight>
            </View>
          </View>

          <TouchableOpacity
            style={styles.FacebookStyle}
            activeOpacity={0.5}
            onPress={() =>
              OnWritingButtonClicked(this.props.navigation, subject)
            }
          >
            <Image style={styles.ImageIconStyle} source={WritingButtonImg} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

function OnWritingButtonClicked(navigation, subject) {
  return navigation.navigate("WritingScreen", {
    subject: subject,
  });
}
