import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const SummaryStoreModel = types
  .model("SummaryStore")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface SummaryStore extends Instance<typeof SummaryStoreModel> {}
export interface SummaryStoreSnapshotOut extends SnapshotOut<typeof SummaryStoreModel> {}
export interface SummaryStoreSnapshotIn extends SnapshotIn<typeof SummaryStoreModel> {}
export const createSummaryStoreDefaultModel = () => types.optional(SummaryStoreModel, {})
