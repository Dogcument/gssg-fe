import AsyncStorage from "@react-native-community/async-storage";
import { callApi } from "./ApiHelper";
import { ServerDogs } from "./Dogs";
export default class UserInfo {
  static instance = null;

  // Caution
  // call init only `AuthScreen`
  static init = async () => {
    if (UserInfo.instance == null) {
      UserInfo.instance = new UserInfo();

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
  setDogByIndex(index) {
    this._dog = index;
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
