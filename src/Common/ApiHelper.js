import UserInfo from "../Common/UserInfo";

const IP = "https://192.168.29.149"
const PORT = ":8080"

///////////////////////////////////////////////////////////////
// 모바일에서 컴퓨터에 띄운 서버를 실행시켜보자
// 1. LINE:3에 당신의 컴퓨터 IP를 입력
// 2. 저장 후 모바일에서 실행
// 3. 잘 됨! (IOS 까탈스럽게 구는게 좀 있어서 거니가 수정 예정)
///////////////////////////////////////////////////////////////

export async function callApi(api, method, body) {
  try {
    let resp = await fetch( IP + PORT + "/api/v1/" + api, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (resp != undefined) {
      let json = await resp.json();

      if (resp.status != 200 && resp.status != 201) {
        errorHandle(json);
        return null;
      } else {
        return json;
      }
    } else {
      console.error("resp is null");
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function callApiToken(api, method, token, body) {
  try {
    let resp = await fetch( IP + PORT + "/api/v1/" + api, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "bearer" + token,
      },
      body: body,
    });

    if (resp != undefined) {
      let json = await resp.json();

      if (resp.status != 200 && resp.status != 201) {
        errorHandle(json);
        return null;
      } else {
        return json;
      }
    } else {
      console.error("resp is null");
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export function errorHandle(json) {
  if (json.code != undefined) {
    if (json.code == "E1011") {
      // expired token
      let userInfo = UserInfo.get();
      userInfo.refreshJwt();
      console.log("refresh jwt");
    } else {
      alert(json.code);
    }
  }
}
