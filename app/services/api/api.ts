/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApisauceInstance, create } from "apisauce"
import { API_CONFIG_LIST, DEFAULT_API_CONFIG } from "../../config"

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance

  /**
   * In case have another baseUrl
   */
  apiCustom: ApisauceInstance
  config: API_CONFIG_LIST

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: API_CONFIG_LIST = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
    // setup another axios with different url
    this.apiCustom = create({
      baseURL: this.config.urlAlt,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
