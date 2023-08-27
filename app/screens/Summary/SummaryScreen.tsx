/* eslint-disable react-native/sort-styles */
import { observer } from "mobx-react-lite"
import React from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { Button, DateTimePicker, Image, ImageStyle, Screen, Text } from "~/components"
import { BookSnapshotIn, useStores } from "~/models"
import { ScreenStackProps } from "~/navigators"
import { getColor, mStyles, spacing, typography } from "~/theme"
import { getDayJs } from "~/utils/formatDate"
import { getRoute } from "~/utils/navigatorHelper"

export const SummaryScreen: ScreenStackProps<"Summary"> = observer(function SummaryScreen(props) {
  const { navigation, route } = props
  const { summaryStore } = useStores()

  const routeOpt = getRoute(route)
  const borrowedBook = summaryStore.getSummaryBorrowedBook
  const borrowedDate = summaryStore.borrowDate
    ? getDayJs(summaryStore.borrowDate).toDate()
    : undefined
  const maxDate = getDayJs().add(7, "day").toDate()
  const canSubmit = summaryStore.canSubmitBooking
  const isLoadSummary = summaryStore.isLoading
  const isEdit = summaryStore.isEditing

  const onSelectDate = (date: string) => {
    summaryStore.setProp("borrowDate", date)
  }

  const onSwitchEdit = () => {
    summaryStore.setProp("isEditing", !isEdit)
  }

  const onDeleteItem = (item: BookSnapshotIn) => () => {
    summaryStore.handleOnAddBook(item)
  }

  const onSubmitBooking = () => {
    summaryStore.handleSubmitBooking()
  }

  return (
    <Screen style={styles.root} routeOpt={routeOpt} preset="fixed">
      <FlatList
        ListHeaderComponent={
          <>
            <DateTimePicker
              value={borrowedDate}
              disabled={borrowedBook.length === 0}
              onSelected={onSelectDate}
              maximumDate={maxDate}
              minuteInterval={15}
              labelTx="summaryScreen.pickupDate"
            />
            <View style={styles.borrowedTextWrapper}>
              <Text
                tx="summaryScreen.borrowedBooks"
                variant="primaryBold"
                style={styles.borrowedBook}
              />
              <Text
                tx={!isEdit ? "summaryScreen.edit" : "summaryScreen.cancel"}
                style={[getColor(isEdit ? "error" : "secondary").textColor, styles.editText]}
                onPress={onSwitchEdit}
              />
            </View>
          </>
        }
        data={borrowedBook}
        style={mStyles.flex}
        keyExtractor={(item, index) => item.key + index}
        contentContainerStyle={{ paddingHorizontal: spacing.md, paddingVertical: spacing.md }}
        renderItem={({ item }) => {
          const bookTitle = item.title
          const bookCover = item.cover_image
          const bookAuthors = item.author_name.slice(0, 5).join(", ")
          const bookEdition = item.edition_count ?? 0

          return (
            <View style={styles.bookWrapper}>
              <Image style={styles.bookCover} source={{ uri: bookCover }} autosize />
              <View style={mStyles.flex}>
                <Text text={bookTitle} numberOfLines={3} style={styles.bookTitle} />
                <Text
                  tx="homeScreen.authorName"
                  txOptions={{ authors: bookAuthors }}
                  style={styles.bookAuthor}
                  numberOfLines={4}
                />
                <Text
                  tx="homeScreen.editionNumber"
                  txOptions={{ edition: bookEdition }}
                  style={styles.bookAuthor}
                />
                <View style={mStyles.flex} />
              </View>
              {isEdit && (
                <Button tx="summaryScreen.delete" onPress={onDeleteItem(item)} buttonSize="small" />
              )}
            </View>
          )
        }}
      />
      <Button
        tx="summaryScreen.submit"
        containerStyle={{ marginHorizontal: spacing.md }}
        loading={isLoadSummary}
        disabled={!canSubmit}
        onPress={onSubmitBooking}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},

  borrowedBook: {
    ...typography.content,
    ...typography.primaryBold,
    marginBottom: spacing.sm,
  },

  borrowedTextWrapper: {
    ...mStyles.centerInline,
    justifyContent: "space-between",
  },
  editText: {
    textDecorationLine: "none",
  },
  bookWrapper: {
    ...mStyles.centerInline,
    ...getColor("line").borderColor,
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingBottom: spacing.sm,
    marginBottom: spacing.sm,
  },
  bookCover: {
    ...getColor("line").borderColor,
    borderWidth: 0.5,
    marginRight: spacing.sm,
    width: 50,
    borderRadius: 5,
  } as ImageStyle,
  bookTitle: {
    ...typography.action,
    ...typography.primaryBold,
    ...typography.secondaryBold,
  },
  bookAuthor: {
    ...typography.remark,
    marginBottom: spacing.xxs,
  },
})
