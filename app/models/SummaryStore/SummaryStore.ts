import { toJS } from "mobx"
import { Instance, SnapshotIn, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { getDayJs } from "~/utils/formatDate"
import { BookModel, BookSnapshotIn } from "../Book/Book"
import { getRootStore } from "../helpers/getRootStore"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const SummaryStoreModel = types
  .model("SummaryStore")
  .props({
    isLoading: types.optional(types.boolean, false),
    isEditing: types.optional(types.boolean, false),

    bookList: types.array(BookModel),
    borrowDate: types.optional(types.string, ""),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get getSummaryBorrowedBook() {
      return toJS(self.bookList)
    },
    get getBorrowedBookList() {
      return this.getSummaryBorrowedBook.map((item) => item.key)
    },

    get canSubmitBooking() {
      return this.getBorrowedBookList.length > 0 && self.borrowDate !== ""
    },
  }))
  .actions((self) => ({
    handleState(obj: SummaryStoreSnapshotIn) {
      applySnapshot(self, { ...self, ...obj })
    },
    handleOnAddBook(item: BookSnapshotIn) {
      const { appStore } = getRootStore(self)
      const borrowed = self.getBorrowedBookList

      const borrowedIndex = borrowed.findIndex((title) => title === item.key)
      const tempArr = self.bookList.slice()

      if (borrowedIndex < 0) {
        if (borrowed.length >= 5) {
          appStore.handleState({ isError: true, message: "You can only borrow up to 5 books" })
          return
        }
        this.handleState({ bookList: [...tempArr, item] })
      } else {
        tempArr.splice(borrowedIndex, 1)
        this.handleState({ bookList: tempArr })
      }
    },
    async handleSubmitBooking() {
      const { appStore, orderStore } = getRootStore(self)
      const selectedDate = getDayJs(self.borrowDate).format("DD MMMM YYYY - HH:mm")

      self.setProp("isLoading", true)

      orderStore.handleState({
        orderList: [
          ...orderStore.orderList,
          { books: self.getSummaryBorrowedBook, pickupDate: self.borrowDate },
        ],
      })

      appStore.handleState({
        isSuccess: true,
        message: `Success Submit!\nPlease pickup on ${selectedDate}`,
      })
      self.setProp("isLoading", false)
      this.handleState({ bookList: [], borrowDate: "" })
    },
  }))

export interface SummaryStore extends Instance<typeof SummaryStoreModel> {}
export interface SummaryStoreSnapshotOut extends SnapshotOut<typeof SummaryStoreModel> {}
export interface SummaryStoreSnapshotIn extends SnapshotIn<typeof SummaryStoreModel> {}
export const createSummaryStoreDefaultModel = () => types.optional(SummaryStoreModel, {})
