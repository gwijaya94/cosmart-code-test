import { toJS } from "mobx"
import { Instance, SnapshotIn, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { apiBook } from "~/services/api"
import { BookModel } from "../Book/Book"
import { getRootStore } from "../helpers/getRootStore"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const BookStoreModel = types
  .model("BookStore")
  .props({
    isLoading: types.optional(types.boolean, false),
    availableSubjects: types.optional(types.array(types.string), ["love", "history", "magic"]),

    subject: types.optional(types.enumeration(["love", "history", "magic"]), "love"),
    bookList: types.array(BookModel),
    bookQuery: types.optional(types.string, ""),
    offset: types.optional(types.number, 0),
    totalBooks: types.optional(types.number, 0),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get getAvailableSubjects() {
      return toJS(self.availableSubjects)
    },

    get getBookList() {
      return toJS(self.bookList)
    },
  }))
  .actions((self) => ({
    handleState(obj: BookStoreSnapshotIn) {
      applySnapshot(self, { ...self, ...obj })
    },

    async searchBook(props?: { isRefresh?: boolean; isLoadMore?: boolean }) {
      this.handleState({ isLoading: true })

      const { appStore } = getRootStore(self)
      if (props.isRefresh) {
        this.handleState({ offset: 0 })
      }

      const { bookQuery, offset, subject } = self
      const newQuery = bookQuery.concat(` subject:${subject}`)
      const result = await apiBook.searchBook({ offset, bookQuery: newQuery })
      this.handleState({ isLoading: false })

      if (result.kind === "ok") {
        const { docs, numFound } = result.data
        const bookData = props.isLoadMore ? [...self.bookList, ...docs] : docs

        this.handleState({ totalBooks: numFound, bookList: bookData, offset: bookData.length })
      } else appStore.handleApiError(result)
    },
  }))

export interface BookStore extends Instance<typeof BookStoreModel> {}
export interface BookStoreSnapshotOut extends SnapshotOut<typeof BookStoreModel> {}
export interface BookStoreSnapshotIn extends SnapshotIn<typeof BookStoreModel> {}
export const createBookStoreDefaultModel = () => types.optional(BookStoreModel, {})
