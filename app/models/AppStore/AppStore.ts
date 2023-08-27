import { Instance, SnapshotIn, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { GeneralApiProblem } from "~/services/api"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const AppStoreModel = types
  .model("AppStore")
  .props({
    isError: types.optional(types.boolean, false),
    errorMessage: types.optional(types.string, ""),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    handleState(obj: AppStoreSnapshotIn) {
      applySnapshot(self, { ...self, ...obj })
    },
    handleApiError(response: GeneralApiProblem) {
      if (response.kind === "unauthorized") {
        console.log("Unauth")
      }
    },
  }))

export interface AppStore extends Instance<typeof AppStoreModel> {}
export interface AppStoreSnapshotOut extends SnapshotOut<typeof AppStoreModel> {}
export interface AppStoreSnapshotIn extends SnapshotIn<typeof AppStoreModel> {}
export const createAppStoreDefaultModel = () => types.optional(AppStoreModel, {})
