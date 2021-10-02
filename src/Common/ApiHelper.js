import UserInfo from "../Common/UserInfo";

// Caution!
// iOS needs https(SSL) by its policy. so, iOS cannot access.
//const IP = "http://127.0.0.1"
//const PORT = ":8080"
const IP = "http://15.165.162.167"
const PORT = ""

export async function callApi(api, method, body) {
  try {
    let resp = await fetch(IP + PORT + "/api/v1/" + api, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    // resp가 undefined면 catch로 넘어감.
    if (resp == undefined) {
      return;
    }

    let json = await resp.json();
    if (resp.status != 200 && resp.status != 201) {
      errorHandle(json);
      return null;
    } else {
      return json;
    }
  } catch (err) {
    alert("서버 응답 없음");
    return null;
  }
}

export async function callApiToken(api, method, token, body) {
  try {
    let resp = await fetch(IP + PORT + "/api/v1/" + api, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer" + token,
      },
      body: body,
    });

    // resp가 undefined면 catch로 넘어감.
    if (resp == undefined) {
      return;
    }

    let json = await resp.json();
    if (resp.status != 200 && resp.status != 201) {
      errorHandle(json);
      return null;
    } else {
      return json;
    }
  } catch (err) {
    alert("서버 응답 없음");
    return null;
  }
}

export function errorHandle(json) {
  if (json.code != undefined) {
    if (json.code == "E1011") {
      let userInfo = UserInfo.instance;
      userInfo.deleteJwt();
      console.log("token is expired");
    } else {
      console.error(json.message);
      alert(json.code);
    }
  }
}
