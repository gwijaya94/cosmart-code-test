// we always make sure 'react-native' gets included first
import "react-native"
// libraries to mock
import "./mockDeviceInfo"
import "./mockI18n"
import "./mockReactNativeImage"
import "./mockReactotron"
import "./mockStorage"

jest.useFakeTimers()
declare global {
  let __TEST__
}
