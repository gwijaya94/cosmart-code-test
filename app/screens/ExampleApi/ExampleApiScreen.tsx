// @demo remove-file
import { toJS } from "mobx"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import { Button, Image, ImageStyle, Screen, Text } from "~/components"
import { useStores } from "~/models"
import { ScreenStackProps } from "~/navigators"
import { getColor, mStyles, spacing, typography } from "~/theme"
import { logging } from "~/utils/function"
import { getRoute } from "~/utils/navigatorHelper"
import { dimens } from "~/utils/variable"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `exampleApi: undefined` to AppStackParamList on navigation-helper.ts
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="exampleApi" component={ExampleApiScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ExampleApiScreen: ScreenStackProps<"exampleApi"> = observer(function ExampleApiScreen({
  route,
}) {
  // Pull in one of our MST stores
  const { userStore } = useStores()

  const routeOpt = getRoute(route)

  useEffect(() => {
    userStore.fetchListUsers()
    return userStore.handleClearState()
  }, [])

  return (
    <Screen routeOpt={routeOpt} preset="fixed">
      <Text style={styling.text}>Hi, You're on {"ExampleApi"} Screen</Text>
      <View style={styling.buttonWrapper}>
        <Button title="GET DATA" onPress={userStore.fetchListUsers} />
        <Button title="CLEAR DATA" onPress={userStore.handleClearState} />
      </View>
      <FlatList
        style={mStyles.flex}
        contentContainerStyle={styling.root}
        data={toJS(userStore.listUsers)}
        onEndReached={({ distanceFromEnd }) => {
          logging("distanceFromEnd", distanceFromEnd)
        }}
        renderItem={({ item }) => {
          const { firstName, id, lastName, email, avatar } = item
          return (
            <View style={styling.itemWrapper} key={id}>
              <Image source={{ uri: avatar }} style={styling.imageStyle} />
              <View>
                <Text text={firstName} />
                <Text text={lastName} />
                <Text text={email} />
              </View>
            </View>
          )
        }}
      />
    </Screen>
  )
})

const styling = {
  root: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  } as ViewStyle,

  text: {
    ...typography.textCenter,
  } as TextStyle,

  buttonWrapper: {
    ...mStyles.centerInline,
    justifyContent: "space-around",
    marginTop: 10,
  } as TextStyle,

  itemWrapper: {
    ...getColor("line").borderColor,
    ...mStyles.centerInline,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    padding: 10,
  } as ViewStyle,

  imageStyle: {
    width: dimens.width * 0.2,
    aspectRatio: 1,
    borderRadius: dimens.width * 0.2,
    marginRight: 15,
  } as ImageStyle,
}
