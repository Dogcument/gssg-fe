import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { styles } from "./Styles";
import { WritingButtonImg, PaperBackgroundImg } from "../../assets/ImageList";
import { callApi } from "../Common/ApiHelper";
import moment from "moment";

export class WritingPrepareScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      subject: null,
      desc: null,
    };
  }

  componentDidMount = async () => {
    this.reqGetTodaySubject();
  };

  reqGetTodaySubject = async () => {
    const fromDate = moment().format("YYYY-MM-DD");
    const toDate = moment().format("YYYY-MM-DD");

    const resp = await callApi("subjects/?from=" + fromDate + "&to=" + toDate);
    if (resp == null) {
      alert("오늘의 글감을 가져오지 못했습니다.");
      return;
    }

    this.onGetTodaySubject(resp);
  };

  onGetTodaySubject(resp) {
    const toDaySubject = resp[0];
    const subject =toDaySubject.subject.name;
    const desc = toDaySubject.subject.description;
    this.setState({ subject: subject, desc: desc });
  }

  render() {
    const subject = this.state.subject;
    const today = moment().format("YYYY년 MM월 DD일");

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
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "Ridi" }}>오늘의 글감</Text>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "15%",
                paddingBottom: "15%",
                paddingLeft: "5%",
                paddingRight: "5%",
              }}
            >
              <Text style={styles.title}>{subject}</Text>
            </View>
            <Text style={{ fontFamily: "Ridi" }}>{today}</Text>
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
