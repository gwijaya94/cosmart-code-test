import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { Icon } from "~/components"
import * as Screens from "~/screens"
import { getColor, spacing, typography } from "~/theme"
import { getRoute } from "~/utils/navigatorHelper"
import { RouteTabProps } from "./navigator.type"

export type BottomTabNavigatorParamList = {
  Home: undefined
  Order: undefined
}

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>()
export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => getBottomTabOpt(route)}
      backBehavior="initialRoute"
    >
      <Tab.Screen name="Home" component={Screens.HomeScreen} />
      <Tab.Screen name="Order" component={Screens.OrderScreen} />
    </Tab.Navigator>
  )
}

const getBottomTabOpt = (route: RouteTabProps) => {
  const getRouteOpt = getRoute(route)
  const routeName = route.name
  const tabActiveColor = getColor("primary").textColor.color
  const tabInactiveColor = getColor("line").textColor.color

  return {
    lazy: true,
    unmountOnBlur: routeName !== "Home",

    headerTintColor: getRouteOpt.tintColor as string,
    headerShown: getRouteOpt.hasHeader,
    title: getRouteOpt.name,
    headerTitle: getRouteOpt.name,
    headerTitleStyle: {
      ...typography.prompt,
      color: getRouteOpt.titleColor,
      ...typography.primaryBold,
    },
    headerStyle: { backgroundColor: getRouteOpt.barColor },
    tabBarActiveTintColor: tabActiveColor,
    tabBarInactiveTintColor: tabInactiveColor,
    tabBarLabelStyle: { ...typography.primaryBold },
    tabBarItemStyle: { paddingVertical: spacing.xxs },
    tabBarIcon: ({ ...rest }) => {
      return <Icon name={getRouteOpt.icon} selectionColor={rest.color} {...rest} />
    },
  } as BottomTabNavigationOptions
}
