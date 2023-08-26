import { IconNode, Input as RNEInput, InputProps as RNEInputProps } from "@rneui/base"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { colors, getColor, mStyles, typography } from "~/theme"
import { getTextStyles } from "~/utils/function"
import { isIos } from "~/utils/variable"
import { Icon } from "./Icon"

export interface InputProps extends RNEInputProps {
  /**
   * An optional style override useful for padding & margin.
   */
  isPassword?: boolean
}

/**
 * Describe your component here
 */
export const Input = observer(function Input(props: InputProps) {
  const { ...rest } = props

  const [showText, setShowText] = React.useState<boolean>(true)
  const [hasText, setHasText] = React.useState<boolean>(false)
  const inputRef = React.useRef(null)

  const isMultiLine = props.multiline || props.numberOfLines > 1

  const wrapper = [styling.container, props.containerStyle]
  const inputStyle = [
    styling.inputTextStyle,
    isMultiLine && ({ textAlignVertical: "top", paddingTop: isIos ? 8 : 10 } as TextStyle),
  ]

  const inputContainer = [
    styling.inputContainer,
    props.disabled && styling.disableInputStyle,
    props.errorMessage && styling.errInputStyle,
  ]
  const rightIconContainer = [styling.rightIconContainer]
  const leftIconContainer = [styling.leftIconContainer]

  const clearText = () => {
    inputRef.current.clear()
    setHasText(false)
  }
  const handleShowPassword = () => setShowText((val) => !val)

  const defaultIconStyle = { type: "material-community", color: colors.line } as IconNode

  const rightIcon = () => {
    const showPasswordIcon = showText ? "eye-off-outline" : "eye-outline"
    const rightIconName = props.isPassword ? showPasswordIcon : "close-circle"
    const onPressed = props.isPassword ? handleShowPassword : clearText

    let iconProps = props.rightIcon

    if (props.errorMessage && !props.rightIcon) {
      return (
        <View style={mStyles.centerInline}>
          <Icon name={rightIconName} iconColor="line" onPress={onPressed} />
          <Icon name="alert-circle-outline" iconColor="error" />
        </View>
      )
    } else if (props.isPassword) {
      iconProps = { name: showPasswordIcon, onPress: onPressed } as IconNode
    } else if (
      ((!props.rightIcon && hasText) || props.defaultValue || props.value) &&
      !props.disabled
    ) {
      iconProps = { name: "close-circle", onPress: clearText } as IconNode
    }
    return Object.assign(defaultIconStyle, iconProps)
  }

  return (
    <View style={wrapper}>
      <RNEInput
        selectionColor={colors.primary}
        {...rest}
        ref={inputRef}
        secureTextEntry={props.isPassword && showText}
        placeholderTextColor={colors.line}
        inputStyle={getTextStyles([...inputStyle, props.inputStyle])}
        inputContainerStyle={[...inputContainer, props.inputContainerStyle]}
        rightIconContainerStyle={[...rightIconContainer, props.rightIconContainerStyle]}
        leftIconContainerStyle={[...leftIconContainer, props.leftIconContainerStyle]}
        containerStyle={styling.containerStyle}
        rightIcon={rightIcon()}
        onChange={(e) => setHasText(!!e.nativeEvent.text)}
        renderErrorMessage={false}
        errorStyle={props.errorMessage && getTextStyles(styling.errorMsgStyle)}
      />
    </View>
  )
})

const styling = {
  container: {
    marginBottom: 15,
  } as ViewStyle,

  containerStyle: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 5,
    overflow: "hidden",
  } as ViewStyle,

  inputContainer: {
    ...getColor("line").borderColor,
    borderRadius: 5,
  } as ViewStyle,

  inputTextStyle: {
    ...typography.primaryRegular,
    ...typography.content,
    fontSize: 14,
    paddingHorizontal: 15,
    paddingBottom: 8,
  } as TextStyle,

  rightIconContainer: { paddingRight: 15, marginVertical: 0 } as ViewStyle,
  leftIconContainer: { paddingRight: 0, marginVertical: 0 } as ViewStyle,

  disableInputStyle: {
    ...getColor("background2").backgroundColor,
    ...getColor("background2").borderColor,
  } as ViewStyle,

  errorMsgStyle: {
    ...typography.remark,
    ...getColor("error").textColor,
    margin: 0,
    marginTop: 3,
  } as TextStyle,

  errInputStyle: {
    ...getColor("error").borderColor,
  } as ViewStyle,
}
