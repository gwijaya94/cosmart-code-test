/* eslint-disable react-native/sort-styles */
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import DateTimePickerModal, {
  DateTimePickerProps as RNDateTimePickerProps,
} from "react-native-modal-datetime-picker"
import { colors, getColor } from "~/theme"
import { getDayJs } from "~/utils/formatDate"
import { Input, InputProps } from "./Input"

type SomeInputProps = Pick<
  InputProps,
  | "placeholder"
  | "placeholderTx"
  | "placeholderTxOpt"
  | "label"
  | "labelTx"
  | "labelTxOpt"
  | "disabled"
>
type SomePickerProps = Omit<RNDateTimePickerProps, "isVisible" | "onConfirm" | "onCancel" | "date">
export type DateTimePickerProps = SomePickerProps &
  SomeInputProps & {
    /**
     * An optional style override useful for padding & margin.
     */
    containerStyle?: StyleProp<ViewStyle>
    onSelected: (date: string) => void
    value?: Date
    format?: string
  }

/**
 * Describe your component here
 */
export const DateTimePicker = observer(function DateTimePicker(props: DateTimePickerProps) {
  const { value, containerStyle, format = "DD MMMM YYYY - HH:mm", onSelected } = props
  const { ...restModal } = props as SomePickerProps
  const { ...restInput } = props as SomeInputProps

  const [showModal, setShowModal] = React.useState(false)

  const wrapperStyle = StyleSheet.flatten([styles.container, containerStyle])
  const iconName = props.mode === "time" ? "clock-outline" : "calendar-month"
  const hasPlaceholder = !!props.placeholder || !!props.placeholderTx

  const formatDate =
    props.format ??
    (props.mode === "date" ? "DD MMMM YYYY" : props.mode === "time" ? "HH:mm" : format)
  const dateValue = value ? getDayJs(value).format(formatDate) : undefined

  const onClickOpenModal = () => {
    setShowModal(true)
  }

  const onConfirmSelected = (date: Date) => {
    const dateData = date.toISOString()
    onSelected && onSelected(dateData)
    setShowModal(false)
  }

  const onCancelPicker = () => {
    setShowModal(false)
  }

  return (
    <View style={wrapperStyle}>
      <Pressable disabled={props.disabled} onPress={onClickOpenModal}>
        <DateTimePickerModal
          mode="datetime"
          minimumDate={getDayJs().toDate()}
          accentColor={colors.primary}
          {...restModal}
          date={value}
          isDarkModeEnabled={false}
          textColor={colors.black}
          isVisible={showModal}
          onConfirm={onConfirmSelected}
          onCancel={onCancelPicker}
        />
        <Input
          {...restInput}
          placeholder={!hasPlaceholder ? "Select date..." : props.placeholder}
          onPressIn={onClickOpenModal}
          value={dateValue}
          editable={false}
          rightIcon={{ name: iconName, color: colors.primary }}
          disabledInputStyle={styles.disableInputStyle}
        />
      </Pressable>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  disableInputStyle: {
    ...getColor("black").textColor,
    opacity: 1,
  },
})
