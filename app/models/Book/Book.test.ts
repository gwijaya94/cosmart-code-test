import { BookModel } from "./Book"

test("can be created", () => {
  const instance = BookModel.create({})

  expect(instance).toBeTruthy()
})
