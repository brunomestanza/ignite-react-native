import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8
  },
  label: {
    fontWeight: "bold",
    fontSize: 14
  },
  taskCounter: {
    color: colors["gray-200"],
    backgroundColor: colors["gray-400"],
    paddingVertical: 2,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999
  }
})