import { TextStyle, ViewStyle } from "react-native"
import { ColorItem, colors } from "./color"

export const getColor = (item: ColorItem, opacity?: number) => {
  const isValidOpacity = (opacity >= 0 && opacity < 100) ?? false
  const _opacity = isValidOpacity ? opacity.toString().padStart(2, "0") : ""
  const _color = colors[item] + _opacity

  return {
    textColor: { color: _color } as TextStyle,
    backgroundColor: { backgroundColor: _color } as ViewStyle,
    divider: { backgroundColor: _color, height: 2, borderRadius: 5 } as ViewStyle,
    borderColor: { borderWidth: 1, borderColor: _color } as ViewStyle,
  }
}

export const mStyles = {
  root: {
    flex: 1,
    backgroundColor: colors.white,
  } as ViewStyle,

  flex: {
    flex: 1,
  } as ViewStyle,
  inline: { flexDirection: "row" } as ViewStyle,
  centerInline: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,

  paddingPage: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  } as ViewStyle,

  centerScreen: {
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
}
