import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const BookModel = types.model("Book").props({
  key: types.maybeNull(types.string),
  type: types.maybeNull(types.string),
  title: types.maybeNull(types.string),
  edition_count: types.maybeNull(types.number),
  ratings_average: types.maybeNull(types.number),
  cover_edition_key: types.maybeNull(types.string),
  cover_i: types.maybeNull(types.number),
  author_key: types.array(types.string),
  author_name: types.array(types.string),
})

export interface Book extends Instance<typeof BookModel> {}
export interface BookSnapshotOut extends SnapshotOut<typeof BookModel> {}
export interface BookSnapshotIn extends SnapshotIn<typeof BookModel> {}
export const createBookDefaultModel = () => types.optional(BookModel, {})
