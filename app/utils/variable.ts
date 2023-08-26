import { Dimensions, Platform } from "react-native"
import * as DeviceInfo from "react-native-device-info"

export const isIos = Platform.OS === "ios"

export const appBundleId = DeviceInfo.getBundleId()
export const appVersion = DeviceInfo.getVersion()
export const appName = DeviceInfo.getApplicationName()

export const dimens = Dimensions.get("screen")
