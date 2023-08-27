import { SummaryStoreModel } from "./SummaryStore"

test("can be created", () => {
  const instance = SummaryStoreModel.create({})

  expect(instance).toBeTruthy()
})
