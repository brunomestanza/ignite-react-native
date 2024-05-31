import { StyleSheet } from 'react-native';

import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.GREY_800,
  },
  history: {
    flexGrow: 1,
    padding: 32,
  },
  swipableRemoveContainer: {
    width: '100%',
    backgroundColor: THEME.COLORS.DANGER_LIGHT,
    height: 90,
    marginBottom: 12,
    borderRadius: 6
  },
  swipableRemoveButton: {
    width: 90,
    height: 90,
    borderRadius: 6,
    backgroundColor: THEME.COLORS.DANGER_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
});