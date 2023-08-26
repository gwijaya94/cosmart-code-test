/**
 * This file imports configuration objects from either the config.dev.js file
 * or the config.prod.js file depending on whether we are in __DEV__ or not.
 *
 * Note that we do not gitignore these files. Unlike on web servers, just because
 * these are not checked into your repo doesn't mean that they are secure.
 * In fact, you're shipping a JavaScript bundle with every
 * config variable in plain text. Anyone who downloads your app can easily
 * extract them.
 *
 * If you doubt this, just bundle your app, and then go look at the bundle and
 * search it for one of your config variable values. You'll find it there.
 *
 * Read more here: https://reactnative.dev/docs/security#storing-sensitive-info
 */
import BaseConfig from "./config.base"
import DevVariable, { ConfigVarType } from "./config.dev"
import API_PATH from "./config.path"
import ProdVariable from "./config.prod"

export type API_CONFIG_LIST = typeof DEFAULT_API_CONFIG
type EnvironmentType = "DEV" | "PROD"

export const Config = { ...BaseConfig }

const variableEnv: { [key in EnvironmentType]: ConfigVarType } = {
  DEV: DevVariable,
  PROD: ProdVariable,
}

const ENVIRONMENT: EnvironmentType = "DEV"
const Variable = variableEnv[ENVIRONMENT]

export const DEFAULT_API_CONFIG = {
  timeout: 60 * 1000,
  env: ENVIRONMENT as EnvironmentType,

  ...API_PATH,
  url: Variable.BASE_URL,
  urlAlt: Variable.BASE_URL_ALT,
}
