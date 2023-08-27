import { ApiResponse } from "apisauce"
import { BookStoreSnapshotIn } from "~/models"
import { Api } from "./api"
import { GetSearchBookResult } from "./api.types"
import { getGeneralApiProblem } from "./apiProblem"

const selectedFields = [
  "title",
  "key",
  "type",
  "ratings_average",
  "author_name",
  "author_key",
  "cover_edition_key",
  "cover_i",
  "edition_count",
  "first_sentence",
]

export class BookApi extends Api {
  async searchBook(props: { bookQuery: string; offset: number }): Promise<GetSearchBookResult> {
    const { apisauce, config } = this

    const response: ApiResponse<any> = await apisauce.get(config.searchBook, {
      q: props.bookQuery,
      offset: props.offset,
      limit: 5,
      fields: selectedFields.join(","),
    })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const bookData: BookStoreSnapshotIn["bookList"] = response.data?.docs ?? []

      const newBookData = bookData.map((item) => {
        const coverImage = config.coverUrl(item.cover_i.toString(), "M")
        return { ...item, cover_image: coverImage }
      })

      return { kind: "ok", data: { ...response.data, docs: newBookData } }
    } catch (error) {
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const apiBook = new BookApi()
