/* eslint-disable react-native/sort-styles */
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, View } from "react-native"
import { Icon, Image, ImageStyle, Input, Screen, Text } from "~/components"
import { useStores } from "~/models"
import { ScreenStackProps } from "~/navigators"
import { ColorItem, colors, getColor, mStyles, spacing, typography } from "~/theme"
import { getRoute } from "~/utils/navigatorHelper"

export const HomeScreen: ScreenStackProps<"Home"> = observer(function HomeScreen(props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { navigation, route } = props
  const { bookStore } = useStores()

  const routeOpt = getRoute(route)
  const availableSubjects = bookStore.getAvailableSubjects
  const selectedSubject = bookStore.subject
  const bookData = bookStore.getBookList
  const bookQuery = bookStore.bookQuery
  const isLoadData = bookStore.isLoading

  useEffect(() => {
    onRefresh()
  }, [])

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
})
