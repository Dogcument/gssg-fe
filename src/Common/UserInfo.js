// Singleton
// Caution
// UserInfo is set only in "AuthScreen" or SignUpScreen 
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
  _id = null;
  setId(id) {
    this._id = id;
  }
  getId() {
    return this._id;
  }

  _nickName = null;
  setNickName(nickName) {
    this._nickName = nickName;
  }
  getNickName() {
    return this._nickName;
  }

  _comment = null;
  setComment(comment) {
    this._comment = comment;
  }  
  getComment() {
    return this._comment
  }

  _dog = null;
  setDog(dog) {
    this._dog = dog;
  }
  getDog() {
    return this._dog;
  }

  isValid() {
    return this._id != null;
  }
}
