import { BookStoreSnapshotIn } from "~/models"
import { GeneralApiProblem } from "./apiProblem"

interface SearchBookType {
  numFound: number
  start: number
  numFoundExact: true
  num_found: number
  q: string
  offset: number
  docs: BookStoreSnapshotIn["bookList"]
}

// just a example type
export type GetSomeResult = { kind: "ok"; users: any[] } | GeneralApiProblem

export type GetSearchBookResult = { kind: "ok"; data: SearchBookType } | GeneralApiProblem
