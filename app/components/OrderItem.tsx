/* eslint-disable react-native/sort-styles */
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { Text } from "~/components/Text"
import { OrderStoreSnapshotIn } from "~/models"
import { getColor, mStyles, spacing, typography } from "~/theme"
import { getDayJs } from "~/utils/formatDate"
import { Icon } from "./Icon"

export interface OrderItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item: OrderStoreSnapshotIn["orderList"][number]
  index: number
}

/**
 * Describe your component here
 */
export const OrderItem = observer(function OrderItem(props: OrderItemProps) {
  const { item, index } = props
  const [showDetail, setShowDetail] = React.useState(false)

  const borrowedBooks = item.books
  const borrowedBooksLength = item.books.length.toString()
  const pickupDate = getDayJs(item.pickupDate).format("DD MMMM YYYY - HH:mm")

  const onCheckDetail = () => {
    setShowDetail((val) => !val)
  }

  return (
    <View style={styles.container}>
      <Text
        tx="component.orderItem.orderNo"
        txOptions={{ orderNo: index + 1 }}
        variant="primaryBold"
        preset="action"
      />
      <View style={styles.divider} />

      <Text
        tx="component.orderItem.booksBorrowed"
        txOptions={{ borrowedLength: borrowedBooksLength }}
      />
      <Text tx="summaryScreen.pickupDate" txOptions={{ date: pickupDate }} />

      <Pressable style={styles.checkDetailWrapper} onPress={onCheckDetail}>
        <Text tx="component.orderItem.checkDetail" style={styles.checkDetail} />
        <Icon name={showDetail ? "chevron-up" : "chevron-down"} iconColor="secondary" />
      </Pressable>

      {showDetail && (
        <View>
          {borrowedBooks.map((item, index) => {
            const bookName = item.title
            const bookAuthor = item.author_name.join(", ")
            return (
              <View key={item.key + index} style={{ marginBottom: spacing.xxs }}>
                <Text text={bookName} variant="secondarySemiBold" />
                <Text text={bookAuthor} preset="remark" />
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    ...getColor("secondary").borderColor,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  divider: {
    ...getColor("line").borderColor,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
    borderWidth: 0.5,
  },

  checkDetailWrapper: {
    ...mStyles.centerInline,
    alignSelf: "flex-end",
  },
  checkDetail: {
    ...typography.remark,
    ...typography.textRight,
    ...getColor("secondary").textColor,
  },
})
