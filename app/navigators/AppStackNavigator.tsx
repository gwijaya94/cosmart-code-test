import { NavigatorScreenParams } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import * as Screens from "~/screens"
import { getNavScreenOpt } from "~/utils/navigatorHelper"
import { BottomTabNavigator, BottomTabNavigatorParamList } from "./BottomTabNavigator"
import { AppStackParamList } from "./navigator.type"

type ListScreenType = {
  name: keyof AppStackParamList
  component: React.ComponentType<object> | (() => JSX.Element)
}

export type AppStackNavigatorParamList = {
  Main: NavigatorScreenParams<BottomTabNavigatorParamList>
  Summary: undefined
  // 🔥 Your stack screens go here
}

const Stack = createNativeStackNavigator<AppStackParamList>()
export const AppStackNavigator = () => {
  const listAppScreen: ListScreenType[] = [
    { name: "Main", component: BottomTabNavigator },
    { name: "Summary", component: Screens.SummaryScreen },
    // 🔥 Your stack data go here
  ]

  return (
    <Stack.Navigator screenOptions={({ route }) => getNavScreenOpt(route)}>
      {listAppScreen.map((item) => {
        return (
          <Stack.Screen name={item.name} component={item.component} key={`screen-${item.name}`} />
        )
      })}
    </Stack.Navigator>
  )
}
