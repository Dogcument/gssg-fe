export function IsValidKey(key) {
  if (key == "Nickname") {
    return false;
  } else if (key == "Comment") {
    return false;
  } else if (key == "SelectedDog") {
    return false;
  }

  return key != "EXPO_CONSTANTS_INSTALLATION_ID";
}

export class UserInfo {
  constructor() {
    if (UserInfo.exist) {
      return UserInfo.instance;
    }

    UserInfo.instance = this;
    UserInfo.exist = true;

    return this;
  }

  SetInfo(nickName, comment) {
    this.nickName = nickName;
    this.comment = comment;
  }

  GetNickName() {
    return this.nickName;
  }

  GetComment() {
    return this.comment;
  }
}
