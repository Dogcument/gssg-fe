// Singleton
// Caution
// UserInfo is set only in "AuthScreen" or "SignUpPopup"
import { errorHandle } from "./CommonMethod";
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

  // Jwt Refresher
  refreshJwt = async () => {
    try {
      let resp = await fetch("http://localhost:8080/api/v1/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: this._refreshToken,
        }),
      });

      if (resp != undefined) {
        let json = await resp.json();
        if (resp.status != 200) {
          if (json.code == "E1011") {
            alert(
              "토큰 갱신했는데 또 올바르지 않는 토큰이 왔다. (데드락에 빠지기 위해 분기처리)"
            );
          } else {
            errorHandle(json);
          }
        } else {
          // refresh success
          this._jwt = json.jwt;
          this._refreshToken = json.refreshToken;
        }
      } else {
        console.error("resp is null");
      }
    } catch (err) {
      console.error(err);
    }
  };
}
