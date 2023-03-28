import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { getStatusBarHeight } from "react-native-safearea-height";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["gray-600"]
  },
  header: {
    backgroundColor: colors["gray-700"],
    width: '100%',
    alignItems: "center",
  },
  logo: {
    marginTop: 40 + getStatusBarHeight(true),
    marginBottom: 70
  },
  inputView: {
    marginTop: -30,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 32,
    width: '100%',
    paddingHorizontal: 24,
  },
  input: {
    backgroundColor: colors["gray-500"],
    padding: 16,
    borderWidth: 1,
    borderColor: colors["gray-700"],
    borderRadius: 6,
    flex: 1,
    fontSize: 16,
    color: colors["gray-100"]
  },
  button: {
    width: 52,
    height: 52,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  countersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 24,
  },
})