import AsyncStorage from "@react-native-community/async-storage";

export function setAccountInfoToStorage(email, pw) {
  AsyncStorage.setItem(
    "account_info",
    JSON.stringify({
      email: email,
      pw: pw
    })
  );
}

export function getAccountInfoFromStorage() {
  let result = null;
  AsyncStorage.getItem("account_info").then(result);
  if (result != undefined) {
    const info = JSON.parse(session);
    return info;
  } 

  return null;
}
