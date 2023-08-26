import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import ReactNativeModal, { ModalProps as RNModalProps } from "react-native-modal"
import { getColor, spacing, typography } from "~/theme"
import { Text } from "./Text"

export interface ModalProps
  extends Omit<Partial<RNModalProps>, "onBackdropPress" | "onSwipeComplete"> {
  title?: string
  content?: string
  onBackdropPress?: () => void
  onCloseModal?: () => void
}

/**
 * Describe your component here
 */
export const Modal = observer(function Modal(props: ModalProps) {
  const { onCloseModal, onBackdropPress, title, content, ...rest } = props

  const onCloseSheet = () => {
    onCloseModal && onCloseModal()
  }

  const onCloseSheetBackDrop = () => {
    if (onBackdropPress) {
      onBackdropPress()
    } else onCloseSheet()
  }

  return (
    <ReactNativeModal
      useNativeDriver
      {...rest}
      style={styling.container}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackButtonPress={onCloseSheet}
      onBackdropPress={onCloseSheetBackDrop}
    >
      <View style={styling.modalWrapper}>
        {title && <Text style={styling.titleText} text={title} />}
        {content && <Text style={styling.contentText} text={content} />}
        {props.children}
      </View>
    </ReactNativeModal>
  )
})

const styling = {
  container: {
    marginHorizontal: 0,
    marginVertical: 0,
  } as ViewStyle,

  modalWrapper: {
    ...getColor("white").backgroundColor,
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.md,
  } as ViewStyle,

  titleText: {
    ...typography.content,
    ...typography.primaryBold,
    ...typography.textCenter,
    marginTop: 8,
    marginBottom: 5,
  } as TextStyle,

  contentText: {
    ...typography.content,
    ...typography.textCenter,
    fontSize: 14,
    marginBottom: 20,
  } as TextStyle,
}
