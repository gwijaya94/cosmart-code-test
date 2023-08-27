import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, RouteProp } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FC } from "react"
import { AppStackNavigatorParamList } from "./AppStackNavigator"
import { BottomTabNavigatorParamList } from "./BottomTabNavigator"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */

export type AppStackParamList = AppStackNavigatorParamList
export type AppStackList = keyof AppStackParamList

type AppStackScreenProps<T extends AppStackList> = NativeStackScreenProps<AppStackParamList, T>
export type ScreenStackProps<T extends AppStackList> = FC<AppStackScreenProps<T>>
export type RouteStackProps = RouteProp<AppStackParamList, AppStackList>

// BOTTOM TAB TYPE
export type BottomTabParamList = BottomTabNavigatorParamList
export type BottomTabList = keyof BottomTabParamList

export type ScreenTabProps<T extends BottomTabList> = FC<TabProps<T>>
export type RouteTabProps = RouteProp<BottomTabParamList, BottomTabList>
type TabProps<T extends BottomTabList> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, T>,
  NativeStackScreenProps<AppStackParamList>
>
