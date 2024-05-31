import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: "center"
  },
  canvas: {
    // The values above are based on the Trophy image (src/assets/trophy.svg)
    width: 257,
    height: 249,
    position: "absolute",
    zIndex: 1
  }
})