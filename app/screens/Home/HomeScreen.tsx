/* eslint-disable react-native/sort-styles */
import { observer } from "mobx-react-lite"
import React, { useEffect, useLayoutEffect } from "react"
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, View } from "react-native"
import { Button, Icon, Image, ImageStyle, Input, Screen, Text } from "~/components"
import { BookSnapshotIn, useStores } from "~/models"
import { ScreenTabProps } from "~/navigators"
import { ColorItem, colors, getColor, mStyles, spacing, typography } from "~/theme"
import { getRoute } from "~/utils/navigatorHelper"

export const HomeScreen: ScreenTabProps<"Home"> = observer(function HomeScreen(props) {
  const { navigation, route } = props
  const { bookStore, summaryStore } = useStores()

  const routeOpt = getRoute(route)
  const availableSubjects = bookStore.getAvailableSubjects
  const selectedSubject = bookStore.subject
  const bookData = bookStore.getBookList
  const bookQuery = bookStore.bookQuery
  const isLoadData = bookStore.isLoading
  const bookBorrowedList = summaryStore.getBorrowedBookList

  useEffect(() => {
    onRefresh()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    })
  }, [bookBorrowedList])

  const HeaderRight = () => {
    return (
      <Pressable style={{ marginRight: spacing.md }} onPress={() => navigation.navigate("Summary")}>
        <Icon name="cart" iconColor="white" />
        <View style={styles.borrowedCount}>
          <Text
            text={bookBorrowedList.length.toString()}
            preset="notes"
            variant="primaryBold"
            style={getColor("white").textColor}
          />
        </View>
      </Pressable>
    )
  }

  const onRefresh = async () => {
    await bookStore.searchBook({ isRefresh: true })
  }

  const onQueryBook = (text: string) => {
    bookStore.handleState({ bookQuery: text })
  }

  const onChangeSubject = (item: string) => async () => {
    bookStore.handleState({ subject: item, bookList: [] })
    await bookStore.searchBook({ isRefresh: true })
  }

  const onEndReached = async () => {
    await bookStore.searchBook({ isLoadMore: true })
  }

  const onBorrowBook = (item: BookSnapshotIn) => () => {
    summaryStore.handleOnAddBook(item)
  }

  return (
    <Screen contentContainerStyle={styles.root} routeOpt={routeOpt} preset="fixed">
      <Input
        placeholderTx="homeScreen.searchPlaceholder"
        placeholderTxOpt={{ search: "Book Title, Author, etc. " }}
        value={bookQuery}
        onChangeText={onQueryBook}
        onEndEditing={onRefresh}
      />
      <View style={styles.availSubsWrapper}>
        <Text tx="homeScreen.availSubject" style={styles.availSubject} />
        <ScrollView horizontal style={mStyles.flex}>
          {availableSubjects.map((item) => {
            const isSelected = item === selectedSubject
            const selectedColor: ColorItem = isSelected ? "primary" : "secondary"

            return (
              <Pressable
                key={item}
                style={[
                  getColor(selectedColor).borderColor,
                  isSelected && getColor(selectedColor, 10).backgroundColor,
                  styles.subjectWrapper,
                ]}
                onPress={onChangeSubject(item)}
              >
                <Text
                  text={item}
                  style={typography.capitalize}
                  variant={isSelected ? "primarySemiBold" : "primaryRegular"}
                />
              </Pressable>
            )
          })}
        </ScrollView>
      </View>

      <FlatList
        data={bookData}
        maxToRenderPerBatch={4}
        style={mStyles.flex}
        keyExtractor={(item, index) => item.key + index}
        ListEmptyComponent={
          !isLoadData && (
            <View style={mStyles.centerScreen}>
              <Text tx="homeScreen.noBook" variant="primaryBold" />
            </View>
          )
        }
        onEndReached={onEndReached}
        ListFooterComponent={
          isLoadData && <ActivityIndicator color={colors.primary} size={"large"} />
        }
        renderItem={({ item }) => {
          const bookTitle = item.title
          const bookCover = item.cover_image
          const bookAuthors = item.author_name.slice(0, 5).join(", ")
          const bookRating = item.ratings_average?.toFixed(2) ?? ""
          const bookEdition = item.edition_count ?? 0
          const isBorrowed = bookBorrowedList.includes(item.key)

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
                {bookRating && (
                  <View style={mStyles.centerInline}>
                    <Icon name="star" size={16} iconColor="award" />
                    <Text text={bookRating} preset="remark" />
                  </View>
                )}
              </View>
              <Button
                tx={isBorrowed ? "homeScreen.cancelButton" : "homeScreen.borrowButton"}
                buttonSize="medium"
                buttonType={isBorrowed ? "secondary" : "primary"}
                containerStyle={styles.borowButton}
                onPress={onBorrowBook(item)}
              />
            </View>
          )
        }}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {
    ...mStyles.paddingPage,
    paddingBottom: 0,
  },
  borrowedCount: {
    ...mStyles.centerScreen,
    right: -spacing.xs,
    top: -spacing.sm,
    borderRadius: 50,
    position: "absolute",
  },

  availSubsWrapper: {
    ...mStyles.centerInline,
    paddingBottom: spacing.md,
  },
  availSubject: {
    ...typography.primarySemiBold,
    marginRight: spacing.xxs,
  },

  subjectWrapper: {
    marginHorizontal: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: 30,
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
    width: 90,
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
  borowButton: {
    marginBottom: spacing.zero,
    alignSelf: "flex-end",
  },
})
