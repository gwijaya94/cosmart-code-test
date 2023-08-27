import { OrderStoreModel } from "./OrderStore"

test("can be created", () => {
  const instance = OrderStoreModel.create({})

  expect(instance).toBeTruthy()
})
