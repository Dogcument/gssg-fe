export function IsValidKey(key) {
  return key == "Writing";
}

// [0] : Time
// [1] : Subject
// [2] : Content
export function ParseSavedItem(item) {
  return item.split("</=/>");
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
