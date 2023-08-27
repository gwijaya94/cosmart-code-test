const palette = {
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
  gold: "#FFD700",

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
  award: palette.gold,
}
