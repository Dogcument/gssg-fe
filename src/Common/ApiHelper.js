import UserInfo from "../Common/UserInfo";

// Caution!
// iOS needs https(SSL) by its policy. so, iOS cannot access.
const IP = "http://54.180.180.213"
const PORT = "" // aws uses port fowarding.

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
