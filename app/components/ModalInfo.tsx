/* eslint-disable react-native/sort-styles */
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleSheet } from "react-native"
import { Text } from "~/components/Text"
import { useStores } from "~/models"
import { ColorItem, spacing, typography } from "~/theme"
import { Button } from "./Button"
import { Icon } from "./Icon"
import { Modal } from "./Modal"

export interface ModalInfoProps {
  /**
   * An optional style override useful for padding & margin.
   */
}

/**
 * Describe your component here
 */
export const ModalInfo = observer(function ModalInfo(props: ModalInfoProps) {
  const { ...rest } = props
  const { appStore } = useStores()

  const showModal = appStore.isError || appStore.isSuccess
  const message = appStore.message
  const iconName = appStore.isSuccess ? "check-decagram" : "close-circle"
  const iconColor: ColorItem = appStore.isSuccess ? "secondary" : "error"

  const onCloseModal = () => {
    appStore.handleState({ isError: false, message: "" })
  }

  return (
    <Modal isVisible={showModal} onCloseModal={onCloseModal} {...rest}>
      <Icon name={iconName} size={64} iconColor={iconColor} />
      <Text style={styles.text} text={message} />

      <Button
        tx="component.modalInfo.closeButton"
        containerStyle={{ marginBottom: spacing.zero }}
        onPress={onCloseModal}
      />
    </Modal>
  )
})

const styles = StyleSheet.create({
  text: {
    ...typography.content,
    ...typography.primaryBold,
    marginBottom: spacing.sm,
  },
})
