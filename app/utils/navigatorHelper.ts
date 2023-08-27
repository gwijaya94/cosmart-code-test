import { NativeStackNavigationOptions } from "@react-navigation/native-stack"
import { ColorValue, StatusBarStyle } from "react-native"
import { AppStackList, BottomTabList, RouteStackProps, RouteTabProps } from "~/navigators"
import { colors, typography } from "~/theme"
import { getCamelCaseText } from "~/utils/function"

type RouteType = RouteStackProps | RouteTabProps
type ScreenList = AppStackList | BottomTabList

export type GetRouteType = {
  hasHeader: boolean
  barStyle: StatusBarStyle
  barColor: ColorValue
  tintColor: ColorValue
  titleColor: ColorValue
  icon: string
  name: string
}

const getRouteName = (route: RouteType) => {
  const routeName = route.name
  return `${getCamelCaseText(routeName)}`
}

const getIconMenu = (route: RouteType) => {
  const routeName = route.name
  // ? will return name of icon based from Material Community Icon
  if (routeName === "Home") {
    return "home"
  } else if (routeName === "Order") {
    return "book-open"
  }
  return "google"
}

export const getRoute = (route: RouteType): GetRouteType => {
  const routeName = route.name
  const secondaryRoute = [] as ScreenList[]
  const noHeader = ["Main"] as ScreenList[]

  const icon = getIconMenu(route)
  const name = getRouteName(route)

  let hasHeader = true as boolean
  let barColor = colors.primary as ColorValue
  let barStyle = "light-content" as StatusBarStyle
  let tintColor = colors.white
  let titleColor = colors.white

  if (secondaryRoute.includes(routeName)) {
    barColor = colors.background2
    barStyle = "dark-content"
    tintColor = colors.black
    titleColor = colors.black
  }
  if (noHeader.includes(routeName)) hasHeader = false

  return { hasHeader, barColor, barStyle, tintColor, icon, name, titleColor }
}

export const getNavScreenOpt = (route: RouteType) => {
  const getRouteOpt = getRoute(route)
  return {
    headerTintColor: getRouteOpt.tintColor,
    headerShown: getRouteOpt.hasHeader,
    headerBackTitle: "",
    headerTitle: getRouteOpt.name,
    headerTitleStyle: {
      ...typography.primaryBold,
      color: getRouteOpt.titleColor,
    },
    headerStyle: { backgroundColor: getRouteOpt.barColor },
  } as NativeStackNavigationOptions
}
