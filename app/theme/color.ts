const palette = {
  // @demo remove-block-start
  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",

  offWhite: "#e6e6e6",
  lighterGrey: "#CDD4DA",
  deepPurple: "#5D2555",

  darkGrey: "#615A5A",
  red1: "#A51318",
  red2: "#ED1C24",
  red3: "#FF0008",

  red: "#CE181E",
  snow: "#f8f6f6",
  // @demo remove-block-end

  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  tint: "#C76542",

  angry100: "#F2D6CD",
  angry500: "#C03403",
  black: "#1a1a1a",
  white: "#ffffff",
  smoke: "#F0EDED",
  grey: "#ADA6AE",
  lightGrey: "#D5D1D9",

  // app  colors
  astraBlue: "#005BAA",
}

export type ColorItem = keyof typeof colors
export const colors = {
  /**
   * color that act as main color of the app
   */
  primary: palette.angry500,
  secondary: palette.astraBlue,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.white,
  background2: palette.smoke,
  background3: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.tint,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,

  line: palette.grey,
  white: palette.white,
  black: palette.black,
}
