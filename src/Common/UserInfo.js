// Singleton
// Caution
// UserInfo is set only in "AuthScreen" or "SignUpPopup"
export default class UserInfo {
  // Instance
  static instance = null;
  static get() {
    if (UserInfo.instance == null) {
      UserInfo.instance = new UserInfo();
    }
    return this.instance;
  }

  // Data
  _token = null;
  _refreshToken = null;

  // User Info
  _nickName = null;
  _comment = null;
  _dog = null;

  // Getter
  isValid() {
    return this._email != null;
  }

  getToken() {
    return this._token;
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
  setToken(jwt) {
    this._token = jwt;
  }
  setRefreshToken(token) {
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
