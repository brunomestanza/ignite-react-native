import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    borderTopColor: colors["gray-400"],
    borderTopWidth: 1,
    marginHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  clipboard: {
    width: 56,
    height: 56,
    marginTop: 48,
    marginBottom: 16
  },
  text: {
    color: colors["gray-300"]
  }
})