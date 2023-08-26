// @demo remove-file
import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetListUsersResult } from "./api.types"
import { getProcessedResponse } from "./apiHelper"
import { getGeneralApiProblem } from "./apiProblem"

export class UserApi extends Api {
  async getListUsers(page = 1): Promise<GetListUsersResult> {
    try {
      const { apisauce, config } = this
      const response: ApiResponse<any> = await apisauce.get(
        config.listUsers,
        { page },
        { headers: {} },
      )
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const processedUserData = (response.data.data as any[]).map((item) => {
        return getProcessedResponse(item)
        // const { first_name, last_name, ...rest } = item
        // return { firstName: first_name, lastName: last_name, ...rest }
      })

      const newData = {
        kind: "ok",
        data: {
          ...response.data,
          perPage: response.data.per_page,
          totalPages: response.data.total_pages,
          data: processedUserData,
        },
      } as GetListUsersResult

      return newData
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      console.log(e.message)
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const apiUser = new UserApi()
