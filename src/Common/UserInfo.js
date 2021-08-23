import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import { callApi } from "./ApiHelper";
import { ServerDogs } from "./Dogs";
export default class UserInfo {
  static instance = null;

  // Caution
  // call init only `AuthScreen`
  static init = async () => {
    if (UserInfo.instance == null) {
      UserInfo.instance = new UserInfo();

      const refreshToken = await AsyncStorage.getItem("refresh_token");
      if (refreshToken != undefined) {
        UserInfo.instance._refreshToken = refreshToken;
      }

      const jwt = await AsyncStorage.getItem("jwt");
      if (jwt != undefined) {
        UserInfo.instance._jwt = jwt;
      }
    }
  };
  static get() {
    return this.instance;
  }

  // Data
  _jwt = null;
  _refreshToken = null;

  // User Info
  _nickName = null;
  _comment = null;
  _dog = null;

  // Getter
  getJwt() {
    return this._jwt;
  }
  getRefreshToken() {
    return this._refreshToken;
  }
  getNickName() {
    return this._nickName;
  }
  getComment() {
    return this._comment;
  }
  getDog() {
    return this._dog;
  }

  tryToGetTempWriting = async () => {
    const tempWriting = await AsyncStorage.getItem("temp_writing");
    if(tempWriting == undefined) {
      return;
    }

    const parsed = JSON.parse(tempWriting);
    if (moment(moment.now()).isSame(moment(parsed.date), "day")) {
      return parsed.content;
    } else {
      AsyncStorage.removeItem("temp_writing");
    }
  }

  // Setter
  setJwt(jwt) {
    AsyncStorage.setItem("jwt", jwt);
    this._jwt = jwt;
  }
  setRefreshToken(token) {
    AsyncStorage.setItem("refresh_token", token);
    this._refreshToken = token;
  }
  setNickName(nickName) {
    this._nickName = nickName;
  }
  setComment(comment) {
    this._comment = comment;
  }
  setDog(dog) {
    let dogIndex = ServerDogs.findIndex((str, index, arr) => str == dog);
    if (dogIndex == -1) {
      console.error("setDog error. dog is not exist. input dog : " + dog);
      dogIndex = 0;
    }
    this._dog = dogIndex;
  }
  setDogByIndex(index) {
    this._dog = index;
  }
  setTempWriting(content) {
    AsyncStorage.setItem(
      "temp_writing",
      JSON.stringify({
        date: moment.now(),
        content: content,
      })
    );
  }

  refreshJwt = async () => {
    const resp = await callApi(
      "auth/refresh",
      "POST",
      JSON.stringify({
        refreshToken: this._refreshToken,
      })
    );
    if (resp == undefined) {
      return;
    }

    this.setJwt(resp.jwt);
    this.setRefreshToken(resp.refreshToken);
  };
}
