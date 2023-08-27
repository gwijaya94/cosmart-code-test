import { BookStoreModel } from "./BookStore"

test("can be created", () => {
  const instance = BookStoreModel.create({})

  expect(instance).toBeTruthy()
})
