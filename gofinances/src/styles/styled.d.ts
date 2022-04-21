import 'styled-components';
import theme from './theme';

// Estamos tipando o tema para que ele tenha autocomplete
declare module 'styled-components' {
  type ThemeType = typeof theme;

  // Adicionamos ao DefalutTheme o tipo ThemeType que acabamos de criar
  export interface DefaultTheme extends ThemeType {}
};
