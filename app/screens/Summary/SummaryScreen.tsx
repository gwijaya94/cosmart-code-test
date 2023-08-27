/* eslint-disable react-native/sort-styles */
import { observer } from "mobx-react-lite"
import React from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { Button, Image, ImageStyle, Screen, Text } from "~/components"
import { useStores } from "~/models"
import { ScreenStackProps } from "~/navigators"
import { getColor, mStyles, spacing, typography } from "~/theme"
import { getRoute } from "~/utils/navigatorHelper"

export const SummaryScreen: ScreenStackProps<"Summary"> = observer(function SummaryScreen(props) {
  const { navigation, route } = props
  const { summaryStore } = useStores()

  const routeOpt = getRoute(route)
  const borrowedBook = summaryStore.getSummaryBorrowedBook
  const canSubmit = summaryStore.canSubmitBooking

  return (
    <Screen style={styles.root} routeOpt={routeOpt} preset="fixed">
      <FlatList
        ListHeaderComponent={
          <>
            <Text
              tx="summaryScreen.borrowedBooks"
              variant="primaryBold"
              style={styles.borrowedBook}
            />
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
            </View>
          )
        }}
      />
      <Button
        tx="summaryScreen.submit"
        containerStyle={{ marginHorizontal: spacing.md }}
        disabled={!canSubmit}
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
