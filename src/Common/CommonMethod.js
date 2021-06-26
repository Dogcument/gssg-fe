export const MagicString = "</=/>";

export function IsValidKey(key) {
  const keys = key.split(MagicString);
  return keys[0] == "Writing";
}

// [0] : Time
// [1] : Subject
// [2] : Content
export function ParseSavedItem(item) {
  return item.split(MagicString);
}
