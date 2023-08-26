import { NativeStackNavigationOptions } from "@react-navigation/native-stack"
import { ColorValue, StatusBarStyle } from "react-native"
import { AppStackList, RouteStackProps } from "~/navigators"
import { colors, typography } from "~/theme"
import { getCamelCaseText } from "~/utils/function"

export type GetRouteType = {
  hasHeader: boolean
  barStyle: StatusBarStyle
  barColor: ColorValue
  tintColor: ColorValue
  titleColor: ColorValue
  icon: string
  name: string
}

const getRouteName = (route: RouteStackProps) => {
  const routeName = route.name
  if (routeName === "demo") {
    return "Demo"
  }
  return `${getCamelCaseText(routeName)} Screen`
}

const getIconMenu = (route: RouteStackProps) => {
  const routeName = route.name
  // ? will return name of icon based from Material Community Icon
  if (routeName === "demo") {
    return "package"
  }
  return "google"
}

export const getRoute = (route: RouteStackProps): GetRouteType => {
  const routeName = route.name
  const secondaryRoute = [] as AppStackList[]
  const noHeader = [] as AppStackList[]

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

export const getNavScreenOpt = (route: RouteStackProps) => {
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
