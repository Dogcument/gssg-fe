// Singleton
// Caution
// UserInfo is set only in "AuthScreen" or "SignUpPopup"
import { errorHandle } from "./CommonMethod";
import AsyncStorage from "@react-native-community/async-storage";
import { callApi } from "./ApiHelper";
import { ServerDogs } from "./Dogs";
export default class UserInfo {
  // Instance
  static instance = null;
  static init = async () => {
    if (UserInfo.instance == null) {
      UserInfo.instance = new UserInfo();

      // get token from async storage
      const refresh_token = await AsyncStorage.getItem("refresh_token");
      if (refresh_token != undefined) {
        UserInfo.instance._refreshToken = refresh_token;
      }

      const jwt = await AsyncStorage.getItem("jwt");
      if (jwt != undefined) {
        UserInfo.instance._jwt = jwt;
      }
    }
  }
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
    const dogIndex = ServerDogs.findIndex((str, index, arr) => str == dog);
    if (dogIndex == -1) {
      console.error("setDog error. dog is not exist. input dog : " + dog);
      dogIndex = 0;
    }
    this._dog = dogIndex;
  }

  // Jwt Refresher
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

    if (resp.code == "E1011") {
      alert(
        "토큰 갱신했는데 또 올바르지 않는 토큰이 왔다. (데드락에 빠지기 위해 분기처리)"
      );
    }
  };
}
