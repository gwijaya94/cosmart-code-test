/* eslint-disable react-native/sort-styles */
import * as Nunito from "@expo-google-fonts/nunito"
import * as SpaceGrotesk from "@expo-google-fonts/space-grotesk"
import { StyleSheet, TextStyle } from "react-native"

/**
 * You can find a list of available fonts on both iOS and Android here:
 * https://github.com/react-native-training/react-native-fonts
 *
 * If you're interested in adding a custom font to your project,
 * check out the readme file in ./assets/fonts/ then come back here
 * and enter your new font name. Remember the Android font name
 * is probably different than iOS.
 * More on that here:
 * https://github.com/lendup/react-native-cross-platform-text
 *
 * The various styles of fonts are defined in the <Text /> component.
 */

type FontFamilyType = Pick<TextStyle, "fontFamily">
type TextAlignmentType = Pick<TextStyle, "textAlign">

/**
 * loaded fonts from @expo-google-fonts
 * https://github.com/expo/google-fonts/blob/master/GALLERY.md#-font-families
 */
export const customFontsToLoad = {
  spaceGroteskLight: SpaceGrotesk.SpaceGrotesk_300Light,
  spaceGroteskRegular: SpaceGrotesk.SpaceGrotesk_400Regular,
  spaceGroteskMedium: SpaceGrotesk.SpaceGrotesk_500Medium,
  spaceGroteskSemiBold: SpaceGrotesk.SpaceGrotesk_600SemiBold,
  spaceGroteskBold: SpaceGrotesk.SpaceGrotesk_700Bold,

  nunitoLight: Nunito.Nunito_300Light,
  nunitoRegular: Nunito.Nunito_400Regular,
  nunitoMedium: Nunito.Nunito_500Medium,
  nunitoSemiBold: Nunito.Nunito_600SemiBold,
  nunitoBold: Nunito.Nunito_700Bold,
}

export const expoFont = (font: keyof typeof customFontsToLoad) => {
  return { fontFamily: font } as FontFamilyType
}

/**
 * Font that included in project, imported from ./assets/fonts
 */
// const fontFamilies = {}

/**
 * Font variants, just need to replace them with fontFamilies data
 */
const fontVariants = {
  // primaryThin: {} as FontFamilyType,
  // primaryExtraLight: {} as FontFamilyType,
  primaryLight: { ...expoFont("nunitoLight") } as FontFamilyType,
  primaryRegular: { ...expoFont("nunitoRegular") } as FontFamilyType, // will be default font
  primaryMedium: { ...expoFont("nunitoMedium") } as FontFamilyType,
  primarySemiBold: { ...expoFont("nunitoSemiBold") } as FontFamilyType,
  primaryBold: { ...expoFont("nunitoBold") } as FontFamilyType,
  // primaryBlack: {} as FontFamilyType,

  // secondaryThin: {} as FontFamilyType,
  // secondaryExtraLight: {} as FontFamilyType,
  secondaryLight: { ...expoFont("spaceGroteskLight") } as FontFamilyType,
  secondaryRegular: { ...expoFont("spaceGroteskRegular") } as FontFamilyType, // will be default font
  secondaryMedium: { ...expoFont("spaceGroteskMedium") } as FontFamilyType,
  secondarySemiBold: { ...expoFont("spaceGroteskSemiBold") } as FontFamilyType,
  secondaryBold: { ...expoFont("spaceGroteskBold") } as FontFamilyType,
  // secondaryBlack: {} as FontFamilyType,
}

const fontPresets = StyleSheet.create({
  headline: {
    ...fontVariants.primaryRegular,
    fontSize: 40,
    // lineHeight: 48,
  },
  heading: {
    ...fontVariants.primaryRegular,
    fontSize: 30,
    // lineHeight: 36,
  },
  highlights: {
    ...fontVariants.primaryRegular,
    fontSize: 24,
    // lineHeight: 30,
  },
  prompt: {
    ...fontVariants.primaryRegular,
    fontSize: 20,
    // lineHeight: 26,
  },
  action: {
    ...fontVariants.primaryRegular,
    fontSize: 18,
    // lineHeight: 24,
  },
  content: {
    ...fontVariants.primaryRegular,
    fontSize: 16,
    // lineHeight: 22,
  },
  remark: {
    ...fontVariants.primaryRegular,
    fontSize: 12,
    // lineHeight: 16,
  },
  notes: {
    ...fontVariants.primaryRegular,
    fontSize: 10,
    // lineHeight: 12,
  },
})

const textAlignment = {
  textRight: { textAlign: "right" } as TextAlignmentType,
  textCenter: { textAlign: "center" } as TextAlignmentType,
  textLeft: { textAlign: "left" } as TextAlignmentType,
  textJustify: { textAlign: "justify" } as TextAlignmentType,
}

/**
 * Contains text presets, aligment, and font variant (weight)
 */
export const typography = {
  ...textAlignment,
  ...fontPresets,
  ...fontVariants,
}

export type TypographyPreset = keyof typeof fontPresets
export type TypographyVariant = keyof typeof fontVariants
