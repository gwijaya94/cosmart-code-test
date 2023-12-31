/**
 * This file is where we do "rehydration" of your RootStore from Local Storage.
 * This lets you persist your state between app launches.
 *
 * Navigation state persistence is handled in navigationUtilities.tsx.
 *
 * Note that Fast Refresh doesn't play well with this file, so if you edit this,
 * do a full refresh of your app instead.
 *
 * @refresh reset
 */
import { IDisposer, applySnapshot, onSnapshot } from "mobx-state-tree"
import * as storage from "~/utils/storage"
import type { RootStore, RootStoreSnapshot } from "../RootStore"

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "rootState"

/**
 * Setup the root state.
 */
let _disposer: IDisposer
export async function setupRootStore(rootStore: RootStore) {
  let restoredState: RootStoreSnapshot

  try {
    // load the last known state from Local Storage
    restoredState = (await storage.load(ROOT_STATE_STORAGE_KEY)) ?? {}
    applySnapshot(rootStore, restoredState)
  } catch (e) {
    // if there's any problems loading, then inform the dev what happened
    if (__DEV__) {
      console.tron.error(e.message, null)
    }
  }

  // stop tracking state changes if we've already setup
  if (_disposer) _disposer()

  // track changes & save to Local Storage
  _disposer = onSnapshot(rootStore, (snapshot) => storage.save(ROOT_STATE_STORAGE_KEY, snapshot))

  const unsubscribe = () => {
    _disposer()
    _disposer = undefined
  }

  return { rootStore, restoredState, unsubscribe }
}
