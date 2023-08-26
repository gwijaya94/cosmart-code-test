import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import ReactNativeModal, { ModalProps } from "react-native-modal"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { getColor, mStyles, spacing, typography } from "~/theme"
import { dimens, isIos } from "~/utils/variable"
import { Icon } from "./Icon"
import { Text } from "./Text"

export interface BottomSheetProps
  extends Omit<Partial<ModalProps>, "onBackdropPress" | "onSwipeComplete"> {
  onBackdropPress?: () => void
  onSwipeComplete?: () => void
  onCloseModal?: () => void
  title?: string
}

/**
 * Describe your component here
 */
export const BottomSheet = observer(function BottomSheet(props: BottomSheetProps) {
  const { onCloseModal, onSwipeComplete, onBackdropPress, ...rest } = props
  const insets = useSafeAreaInsets()

  const modalWrapper = [
    styling.modalWrapper,
    { paddingBottom: isIos ? insets.bottom : 20 },
  ] as StyleProp<ViewStyle>

  const onCloseSheet = () => {
    onCloseModal && onCloseModal()
  }

  const onCloseSheetBackDrop = () => {
    if (onBackdropPress) {
      onBackdropPress()
    } else onCloseSheet()
  }
  const onCloseSheetSwipe = () => {
    if (onSwipeComplete) {
      onSwipeComplete()
    } else onCloseSheet()
  }

  return (
    <ReactNativeModal
      swipeThreshold={50}
      {...rest}
      useNativeDriverForBackdrop
      animationOutTiming={500}
      swipeDirection="down"
      onBackButtonPress={onCloseSheet}
      onBackdropPress={onCloseSheetBackDrop}
      onSwipeComplete={onCloseSheetSwipe}
      style={styling.container}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      scrollTo={() => {}}
      scrollOffset={1}
    >
      <View style={modalWrapper}>
        <View style={styling.slider} />
        <View style={styling.headerWrapper}>
          <Text style={styling.titleText} text={props.title} />
          <Icon name="close" iconColor="black" onPress={onCloseSheet} />
        </View>
        {props.children}
      </View>
    </ReactNativeModal>
  )
})

const styling = {
  container: {
    marginHorizontal: 0,
    marginVertical: 0,
    justifyContent: "flex-end",
  } as ViewStyle,

  modalWrapper: {
    ...getColor("white").backgroundColor,
    paddingTop: 10,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  } as ViewStyle,

  slider: {
    ...getColor("line", 10).backgroundColor,
    width: dimens.width * 0.2,
    height: 5,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: spacing.md,
  } as ViewStyle,

  headerWrapper: {
    ...mStyles.centerInline,
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    marginBottom: 10,
  } as ViewStyle,

  titleText: {
    ...typography.primaryBold,
    ...mStyles.flex,
    marginRight: 16,
  } as TextStyle,
}
