// @demo remove-file
import { ExampleStoreModel } from "./ExampleStore"

test("can be created", () => {
  const instance = ExampleStoreModel.create({})

  expect(instance).toBeTruthy()
})
