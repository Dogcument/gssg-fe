import UserInfo from "../Common/UserInfo";

export async function callApi(api, method, body) {
  try {
    let resp = await fetch("http://localhost:8080/api/v1/" + api, {
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
    }
  } catch (err) {
    console.error(err);
  }
}

export async function callApiToken(api, method, token, body) {
  try {
    let resp = await fetch("http://localhost:8080/api/v1/" + api, {
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
    }
  } catch (err) {
    console.error(err);
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
