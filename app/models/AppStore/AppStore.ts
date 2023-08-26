import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const AppStoreModel = types
  .model("AppStore")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AppStore extends Instance<typeof AppStoreModel> {}
export interface AppStoreSnapshotOut extends SnapshotOut<typeof AppStoreModel> {}
export interface AppStoreSnapshotIn extends SnapshotIn<typeof AppStoreModel> {}
export const createAppStoreDefaultModel = () => types.optional(AppStoreModel, {})
