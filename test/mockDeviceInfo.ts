import mockRNDeviceInfo from "react-native-device-info/jest/react-native-device-info-mock"

jest.doMock("react-native-device-info", () => mockRNDeviceInfo)
