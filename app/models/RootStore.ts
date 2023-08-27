import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { createAppStoreDefaultModel } from "./AppStore/AppStore"
import { createBookStoreDefaultModel } from "./BookStore/BookStore"
// @demo remove-block-start
import { createExampleStoreDefaultModel } from "./ExampleStore/ExampleStore"
import { createUserStoreDefaultModel } from "./UserStore/UserStore"

// @demo remove-block-end

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  // @demo remove-block-start
  userStore: createUserStoreDefaultModel(),
  exampleStore: createExampleStoreDefaultModel(),
  // @demo remove-block-end
  appStore: createAppStoreDefaultModel(),
  bookStore: createBookStoreDefaultModel(),
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
