// Singleton
// Caution
// UserInfo is set only in "AuthScreen" or "SignUpPopup"

import AsyncStorage from "@react-native-community/async-storage";
export default class UserInfo {
  // Instance
  static instance = null;
  static get() {
    if (UserInfo.instance == null) {
      UserInfo.instance = new UserInfo();

      // get token from async storage
      let refresh_token = undefined;
      AsyncStorage.getItem("refresh_token").then(refresh_token);
      if (refresh_token != undefined) {
        _refreshToken = refresh_token;
      }

      let jwt = undefined;
      AsyncStorage.getItem("jwt").then(jwt);
      if (jwt != undefined) {
        _jwt = jwt;
      }
    }
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
  isValid() {
    return this._refreshToken != null;
  }

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
    this._dog = dog;
  }
}
