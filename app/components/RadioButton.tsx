import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { ColorItem, getColor, mStyles, typography } from "~/theme"
import { Icon } from "./Icon"
import { Text } from "./Text"

export interface RadioButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  value: string
  label: string
  selected?: boolean
  onPress?: (value: string) => void | undefined
}

/**
 * Describe your component here
 */
export const RadioButton = observer(function RadioButton(props: RadioButtonProps) {
  const { selected, style, onPress, value, label } = props
  const styles = Object.assign({}, styling.container, style)

  const iconName = selected ? "radiobox-marked" : "radiobox-blank"
  const iconColor: ColorItem = selected ? "secondary" : "line"

  const onPressedValue = () => {
    const valueString = value
    onPress(valueString)
  }

  return (
    <TouchableOpacity activeOpacity={1} style={styles} onPress={onPressedValue}>
      <Icon name={iconName} iconColor={iconColor} size={18} />
      <View style={styling.textWrapper}>
        <Text style={styling.text} text={label} />
      </View>
    </TouchableOpacity>
  )
})

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
