import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: colors["gray-400"],
    backgroundColor: colors["gray-500"],
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 24
  },
  incompleteButton: {
    borderWidth: 2,
    width: 24,
    height: 24,
    borderRadius: 999,
    borderColor: colors.blue,
  },
  completeButton: {
    borderWidth: 2,
    width: 24,
    height: 24,
    borderRadius: 999,
    borderColor: colors.purple,
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: colors["gray-200"],
    flex: 1
  },
  doneText: {
    color: colors["gray-300"],
    flex: 1,
    textDecorationLine: 'line-through'
  }
})