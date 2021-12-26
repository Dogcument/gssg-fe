import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  profileView: {
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  ImageStyle: {
    height: 50,
    width: 50,
  },
  writingContentModal: {
    fontFamily: "Ridi",
    backgroundColor: "#FFFFFF",
    width: "80%",
    marginLeft: "10%",
    height: "60%",
    borderRadius: 5,
    padding: 20,
  },
  closeModalButton: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
