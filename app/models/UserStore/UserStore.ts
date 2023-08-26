// @demo remove-file
import { Instance, SnapshotIn, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { apiUser } from "~/services/api"
import { UserModel, UserSnapshotOut } from "../User/User"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    page: types.optional(types.number, 1),
    totalPages: types.optional(types.number, 1),
    listUsers: types.optional(types.array(UserModel), []),
    selectedUser: types.maybeNull(UserModel),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    handleState: (props: UserStoreSnapshotIn) => {
      applySnapshot(self, { ...self, ...props })
    },
    handleSetUser: (user: UserSnapshotOut) => {
      applySnapshot(self, { selectedUser: user })
    },
    handleClearState: () => {
      applySnapshot(self, {})
    },
    async fetchListUsers() {
      const resultData = await apiUser.getListUsers()
      if (resultData.kind === "ok") {
        const { data, ...rest } = resultData.data
        this.handleState({ listUsers: data, ...rest })
      } else {
        __DEV__ && console.tron.log(resultData.kind)
      }
    },
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
