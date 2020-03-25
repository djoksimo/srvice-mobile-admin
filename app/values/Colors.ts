export const Colors = {
  primary: '#01579B',
  primaryLight: '#4F83CC',
  primaryDark: '#002F6C',
  secondary: '#FFAB00',
  secondaryLight: '#FFDD4B',
  secondaryDark: '#C67C00',
  white: '#FFFFFF',
  black: '#000000',
  text: '#3E3935',
  gradientLight: '#01579B',
  screenBackground: '#FBFBFB',
  bland: '#C4C4C4',
  blandLight: '#EDEDED',
  blandDark: '#7a7a7a',
  success: '#00AB00',
  error: '#F55050',
  red: '#F55050',
  teal: '#6CB4AB',
  violet: '#6C74B4',
  pink: '#B46C86',
  translucentPrimaryLight: 'rgba(79,131,204,0.50)',
};

type Keys = keyof typeof Colors;

export type ColorType = typeof Colors[Keys];
