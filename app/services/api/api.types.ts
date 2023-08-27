// @demo remove-next-line
import { BookSnapshotIn, UserSnapshotOut } from "~/models"
import { GeneralApiProblem } from "./apiProblem"

interface SearchBookType {
  numFound: number
  start: number
  numFoundExact: true
  num_found: number
  q: string
  offset: number
  docs: BookSnapshotIn[]
}

// @demo remove-block-start
export interface User {
  id: number
  name: string
}

export interface PaginationData<T> {
  page: number
  perPage: number
  total: number
  totalPages: number
  data: T[]
}

// @demo remove-block-end
// just a example type
export type GetSomeResult = { kind: "ok"; users: any[] } | GeneralApiProblem
// @demo remove-block-start

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetListUsersResult =
  | { kind: "ok"; data: PaginationData<UserSnapshotOut> }
  | GeneralApiProblem
// @demo remove-block-end

export type GetSearchBookResult = { kind: "ok"; data: SearchBookType } | GeneralApiProblem
