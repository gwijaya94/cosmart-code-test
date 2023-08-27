/* eslint-disable react-native/sort-styles */
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleSheet } from "react-native"
import { Text } from "~/components/Text"
import { useStores } from "~/models"
import { spacing, typography } from "~/theme"
import { Button } from "./Button"
import { Icon } from "./Icon"
import { Modal } from "./Modal"

export interface ModalErrorProps {
  /**
   * An optional style override useful for padding & margin.
   */
}

/**
 * Describe your component here
 */
export const ModalError = observer(function ModalError(props: ModalErrorProps) {
  const { ...rest } = props
  const { appStore } = useStores()

  const showModal = appStore.isError
  const message = appStore.errorMessage

  const onCloseModal = () => {
    appStore.handleState({ isError: false, errorMessage: "" })
  }

  return (
    <Modal isVisible={showModal} onCloseModal={onCloseModal} {...rest}>
      <Icon name="close-circle" size={54} iconColor="error" />
      <Text style={styles.text} text={message} />

      <Button
        tx="component.modalError.closeButton"
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
