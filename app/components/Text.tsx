import I18n from "i18n-js"
import * as React from "react"
import { Text as RNText, StyleSheet, TextStyle, TextProps as TxtProps } from "react-native"
import { TxKeyPath, translate } from "~/i18n"
import { TypographyPreset, TypographyVariant, getColor, typography } from "~/theme"
import { getTextStyles } from "~/utils/function"

export interface TextProps extends TxtProps {
  disabled?: boolean

  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: I18n.TranslateOptions
  /**
   * One of the different types of text presets.
   */
  preset?: TypographyPreset
  /**
   * Font Family modifier.
   */
  variant?: TypographyVariant
}

export function Text(props: TextProps) {
  const { tx, txOptions, text, children, style: styleOverride, preset, variant, ...rest } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children
  const fontPresets = typography[preset]
  const fontVariant = typography[variant]

  const styles = StyleSheet.flatten([
    styling.default,
    props.onPress && styling.link,
    props.disabled && styling.disabled,
    fontPresets,
    fontVariant,
    styleOverride,
  ])

  const onPressedButton = !props.onPress || props.disabled ? undefined : props.onPress

  return (
    <RNText {...rest} style={getTextStyles(styles)} onPress={onPressedButton}>
      {content}
    </RNText>
  )
}

const styling = {
  default: {
    ...getColor("black").textColor,
  } as TextStyle,

  link: {
    ...getColor("secondary").textColor,
    textDecorationLine: "underline",
  } as TextStyle,

  disabled: {
    ...getColor("line").textColor,
  } as TextStyle,
}
