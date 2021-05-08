export function IsValidKey(key) {
  if (key == "Nickname") {
      return false;
  } else if (key == "Comment") {
      return false;
  }

  return key != "EXPO_CONSTANTS_INSTALLATION_ID";
}
