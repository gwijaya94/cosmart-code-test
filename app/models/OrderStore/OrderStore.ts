import { toJS } from "mobx"
import { Instance, SnapshotIn, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { BookModel } from "../Book/Book"
import { withSetPropAction } from "../helpers/withSetPropAction"

const OrderModel = types.model({
  books: types.array(BookModel),
  pickupDate: types.maybeNull(types.string),
})

export const OrderStoreModel = types
  .model("OrderStore")
  .props({
    isLoading: types.optional(types.boolean, false),

    orderList: types.array(OrderModel),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get getOrderList() {
      return toJS(self.orderList)
    },
  }))
  .actions((self) => ({
    handleState(obj: OrderStoreSnapshotIn) {
      applySnapshot(self, { ...self, ...obj })
    },
    async handleGetOrderData() {
      this.handleState({ isLoading: true })
      this.handleState({ isLoading: false })
    },
  }))

export interface OrderStore extends Instance<typeof OrderStoreModel> {}
export interface OrderStoreSnapshotOut extends SnapshotOut<typeof OrderStoreModel> {}
export interface OrderStoreSnapshotIn extends SnapshotIn<typeof OrderStoreModel> {}
export const createOrderStoreDefaultModel = () => types.optional(OrderStoreModel, {})
