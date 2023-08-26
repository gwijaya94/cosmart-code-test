import { IconNode, Button as RNEButton, ButtonProps as RNEButtonProps } from "@rneui/base"
import I18n from "i18n-js"
import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { TxKeyPath, translate } from "~/i18n"
import { colors, getColor, spacing, typography } from "~/theme"
import { getTextStyles } from "~/utils/function"
import { Text } from "./Text"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */

export interface BtnProps extends RNEButtonProps {
  buttonSize?: "regular" | "medium" | "small"
  buttonType?: "primary" | "secondary"

  tx?: TxKeyPath
  txOptions?: I18n.TranslateOptions
}

export function Button(props: BtnProps) {
  const { buttonSize, buttonType, tx, txOptions, ...rest } = props

  let btnStyle: ViewStyle = {}
  let btnTxtStyle: TextStyle = {}
  let defaultIconStyle: IconNode = { type: "material-community", color: colors.white }

  if (buttonSize === "medium") {
    btnStyle = Object.assign(btnStyle, styling.buttonMediumStyle)
    btnTxtStyle = Object.assign(btnTxtStyle, styling.buttonMediumText)
  } else if (buttonSize === "small") {
    btnStyle = Object.assign(btnStyle, styling.buttonSmallStyle)
    btnTxtStyle = Object.assign(btnTxtStyle, styling.buttonSmallText)
  }
  if (buttonType === "secondary") {
    btnStyle = Object.assign(btnStyle, styling.secondaryBtnStyle)
    btnTxtStyle = Object.assign(btnTxtStyle, styling.secondaryTxtStyle)
    defaultIconStyle = { ...defaultIconStyle, color: colors.secondary }
  }

  const disabled = props.disabled || props.loading
  const buttonStyle = [styling.buttonRegularStyle, btnStyle, props.buttonStyle]
  const containerStyle = [styling.buttonContainer, props.containerStyle]
  const textStyles = [
    styling.buttonRegularText,
    btnTxtStyle,
    disabled && styling.disableTxtStyle,
    props.titleStyle,
  ]
  const icon: IconNode = Object.assign(defaultIconStyle, props.icon)

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || props.title || props.children

  return (
    <RNEButton
      {...rest}
      disabled={disabled}
      containerStyle={containerStyle}
      buttonStyle={buttonStyle}
      titleStyle={getTextStyles(textStyles)}
      disabledStyle={styling.disableBtnStyle}
      disabledTitleStyle={styling.disableTxtStyle}
      icon={props.icon && icon}
    >
      <Text style={getTextStyles(textStyles)}>{content}</Text>
    </RNEButton>
  )
}

const styling = {
  buttonContainer: {
    marginBottom: 15,
    borderRadius: 100,
  } as ViewStyle,

  buttonRegularText: {
    ...typography.content,
    ...typography.primaryBold,
    ...getColor("white").textColor,
  } as TextStyle,

  buttonRegularStyle: {
    ...getColor("secondary").backgroundColor,
    ...getColor("secondary").borderColor,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xl,
  } as ViewStyle,

  buttonMediumText: {
    ...typography.content,
    ...typography.primaryBold,
    fontSize: 14,
  } as TextStyle,

  buttonMediumStyle: {
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.md,
  } as TextStyle,

  buttonSmallText: {
    ...typography.remark,
  } as TextStyle,

  buttonSmallStyle: {
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.xs,
  } as TextStyle,

  secondaryBtnStyle: {
    ...getColor("white").backgroundColor,
    ...getColor("secondary").borderColor,
  } as ViewStyle,

  secondaryTxtStyle: {
    ...getColor("secondary").textColor,
  } as TextStyle,

  disableBtnStyle: {
    ...getColor("line").backgroundColor,
    ...getColor("line").borderColor,
  } as ViewStyle,

  disableTxtStyle: {
    ...getColor("white").textColor,
  } as TextStyle,
}
