import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { ColorItem, getColor, mStyles, typography } from "~/theme"
import { Icon } from "./Icon"
import { Text } from "./Text"

interface CheckboxProps {
  value: string
  label: string
  multiline?: boolean
  checked?: boolean

  style?: StyleProp<ViewStyle>
  onPress?: (value: string) => void | undefined | null
}

export function Checkbox(props: CheckboxProps) {
  const { checked, style } = props

  const numberOfLines = props.multiline ? 2 : 1

  const styles = Object.assign({}, styling.container, style)
  const iconName = checked ? "checkbox-marked" : "checkbox-blank-outline"
  const iconColor: ColorItem = checked ? "primary" : "line"

  const onPressedValue = () => {
    props.onPress(props.value)
  }

  return (
    <TouchableOpacity activeOpacity={1} style={styles} onPress={onPressedValue}>
      <Icon name={iconName} iconColor={iconColor} size={18} />
      <View style={styling.textWrapper}>
        <Text style={styling.text} text={props.label} numberOfLines={numberOfLines} />
      </View>
    </TouchableOpacity>
  )
}

const styling = {
  container: {
    ...mStyles.centerInline,
    ...mStyles.flex,
    marginBottom: 10,
  } as ViewStyle,

  text: {
    ...typography.content,
    ...getColor("secondary").textColor,
    fontSize: 14,
  } as TextStyle,

  textWrapper: {
    ...getColor("background2").backgroundColor,
    borderRadius: 100,
    marginLeft: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  } as ViewStyle,
}
