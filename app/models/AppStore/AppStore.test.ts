import { AppStoreModel } from "./AppStore"

test("can be created", () => {
  const instance = AppStoreModel.create({})

  expect(instance).toBeTruthy()
})
