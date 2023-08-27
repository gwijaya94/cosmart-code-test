import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { createAppStoreDefaultModel } from "./AppStore/AppStore"
import { createBookStoreDefaultModel } from "./BookStore/BookStore"
import { createOrderStoreDefaultModel } from "./OrderStore/OrderStore"
import { createSummaryStoreDefaultModel } from "./SummaryStore/SummaryStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  appStore: createAppStoreDefaultModel(),
  bookStore: createBookStoreDefaultModel(),
  orderStore: createOrderStoreDefaultModel(),
  summaryStore: createSummaryStoreDefaultModel(),
  // 🔥 Your models go here
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotIn<typeof RootStoreModel> {}
