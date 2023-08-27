import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const OrderStoreModel = types
  .model("OrderStore")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface OrderStore extends Instance<typeof OrderStoreModel> {}
export interface OrderStoreSnapshotOut extends SnapshotOut<typeof OrderStoreModel> {}
export interface OrderStoreSnapshotIn extends SnapshotIn<typeof OrderStoreModel> {}
export const createOrderStoreDefaultModel = () => types.optional(OrderStoreModel, {})
