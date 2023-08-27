/* eslint-disable react-native/sort-styles */
import { observer } from "mobx-react-lite"
import React from "react"
import { StyleSheet } from "react-native"
import { Screen, Text } from "~/components"
// import { useStores } from "~/models"
import { ScreenStackProps } from "~/navigators"
import { mStyles, typography } from "~/theme"
import { getRoute } from "~/utils/navigatorHelper"

export const SummaryScreen: ScreenStackProps<"Summary"> = observer(function SummaryScreen(props) {
  const { navigation, route } = props
  // const { app, userStore } = useStores()

  const routeOpt = getRoute(route)

  return (
    <Screen style={styles.root} routeOpt={routeOpt}>
      <Text style={styles.text}>Hi, You're on Summary Screen</Text>
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {
    ...mStyles.paddingPage,
  },

  text: {
    ...typography.textCenter,
  },
})
