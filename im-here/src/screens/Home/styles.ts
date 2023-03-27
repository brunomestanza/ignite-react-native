import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131016',
    padding: 24,
  },
  eventName: {
    color: '#FDFCFE',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28
  },
  eventDate: {
    color: '#6B6B6B',
    fontSize: 16
  },
  form: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    marginTop: 36,
    marginBottom: 42
  },
  input: {
    flex: 1,
    backgroundColor: '#1F1E25',
    height: 56,
    borderRadius: 5,
    color: '#FFF',
    padding: 16,
    fontSize: 16
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: '#31CF67',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24
  },
  listEmptyText: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center'
  }
})