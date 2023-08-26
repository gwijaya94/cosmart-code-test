/* eslint-disable react-native/split-platform-components */
import I18n from "i18n-js"
import {
  LayoutAnimation,
  LayoutAnimationStatic,
  StyleProp,
  StyleSheet,
  TextStyle,
  ToastAndroid,
} from "react-native"
import { typography } from "~/theme"
import { changeDateLocale } from "./formatDate"
import { openLinkInBrowser } from "./openLinkBrowser"
import { dimens, isIos } from "./variable"

export const logging = (name: string, value: any) => {
  if (__DEV__) {
    console.log(name, value)
    console.tron.display({ name, value })
  }
}

export const getCamelCaseText = (text: string) => {
  text = text[0].toUpperCase() + text.substring(1)
  return text.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
}

export const convertToCamelCase = (text: string) => {
  return text.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "")
  })
}

export const numberPrettier = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const getFontSize = (fontSize: number) => {
  const tempFontSize = fontSize || 14

  // return Math.round(tempFontSize / dimens.fontScale)
  return tempFontSize / dimens.fontScale
}

export const getTextStyles = (styles: StyleProp<TextStyle>) => {
  const tempStyles = StyleSheet.flatten(styles)
  const tempFontSize = tempStyles.fontSize ?? 14
  const fontFamily = tempStyles.fontFamily ?? typography.primaryRegular.fontFamily

  return StyleSheet.flatten([tempStyles, { fontFamily, fontSize: getFontSize(tempFontSize) }])
}

export const createAnimation = (type?: keyof LayoutAnimationStatic["Presets"]) => {
  type = type || "easeInEaseOut"
  return LayoutAnimation.configureNext(LayoutAnimation.Presets[type])
}

export const showToast = (text: string, duration = 3000) => {
  if (!isIos) return ToastAndroid.show(text, duration)
}

export const accessMaps = async (
  coordinate: { latitude: number; longitude: number },
  props: { desc?: string; provider?: "google" | "apple" | "waze" },
) => {
  const { desc = "", provider = "google" } = props
  const { longitude, latitude } = coordinate

  const latLng = `${latitude},${longitude}`
  // const scheme = isIos ? "maps:0,0?q=" : "geo:0,0?q="
  // const url = isIos ? `${scheme}${label}@${latLng}` : `${scheme}${latLng}(${label})`

  let url = `http://maps.google.com/maps?ll=${latLng}&q=${props.desc ?? ""}`

  if (provider === "apple") {
    url = `maps:0,0?q=${desc}@${latLng}`
  } else if (provider === "waze") {
    url = `https://waze.com/ul?ll=${latLng}&q=${props.desc ?? ""}`
  }

  openLinkInBrowser(url)
}

export const changeLocale = (localeName: "id" | "en") => {
  changeDateLocale(localeName)
  I18n.locale = localeName
}
