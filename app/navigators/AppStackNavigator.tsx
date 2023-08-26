import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import * as Screens from "~/screens"
import { getNavScreenOpt } from "~/utils/navigatorHelper"
import { AppStackParamList } from "./navigator.type"

type ListScreenType = {
  name: keyof AppStackParamList
  component: React.ComponentType<object> | (() => JSX.Element)
}

export type AppStackNavigatorParamList = {
  demo: undefined
  example: undefined
  exampleApi: undefined
  // 🔥 Your stack screens go here
}

const Stack = createNativeStackNavigator<AppStackParamList>()
export const AppStackNavigator = () => {
  const listAppScreen: ListScreenType[] = [
    // @demo remove-block-start
    { name: "example", component: Screens.ExampleScreen },
    { name: "exampleApi", component: Screens.ExampleApiScreen },
    // @demo remove-block-end
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
