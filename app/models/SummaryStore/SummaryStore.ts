import { toJS } from "mobx"
import { Instance, SnapshotIn, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { BookModel, BookSnapshotIn } from "../Book/Book"
import { getRootStore } from "../helpers/getRootStore"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const SummaryStoreModel = types
  .model("SummaryStore")
  .props({
    bookList: types.array(BookModel),
    borrowDate: types.optional(types.string, ""),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get getBorrowedBookList() {
      return toJS(self.bookList).map((item) => item.key)
    },
  }))
  .actions((self) => ({
    handleState(obj: SummaryStoreSnapshotIn) {
      applySnapshot(self, { ...self, ...obj })
    },
    handleOnAddBook(item: BookSnapshotIn) {
      const { appStore } = getRootStore(self)
      const borrowed = self.getBorrowedBookList

      if (borrowed.length >= 5) {
        appStore.handleState({ isError: true, errorMessage: "You can only borrow up to 5 books" })
        return
      }

      const borrowedIndex = borrowed.findIndex((title) => title === item.key)
      const tempArr = self.bookList.slice()
      if (borrowedIndex < 0) {
        this.handleState({ bookList: [...tempArr, item] })
      } else {
        tempArr.splice(borrowedIndex, 1)
        console.tron.log(tempArr)
        this.handleState({ bookList: tempArr })
      }
    },
  }))

export interface SummaryStore extends Instance<typeof SummaryStoreModel> {}
export interface SummaryStoreSnapshotOut extends SnapshotOut<typeof SummaryStoreModel> {}
export interface SummaryStoreSnapshotIn extends SnapshotIn<typeof SummaryStoreModel> {}
export const createSummaryStoreDefaultModel = () => types.optional(SummaryStoreModel, {})
