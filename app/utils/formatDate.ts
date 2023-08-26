import dayjs from "dayjs"

const customParseFormat = require("dayjs/plugin/customParseFormat")
const duration = require("dayjs/plugin/duration")
const localeData = require("dayjs/plugin/localeData")
const relativeTime = require("dayjs/plugin/relativeTime")
const updateLocale = require("dayjs/plugin/updateLocale")

dayjs.extend(duration)
dayjs.extend(updateLocale)
dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.extend(localeData)

const getLocale = () => {
  const currentLocale = dayjs().locale()
  //   const textLocale = I18n.currentLocale()
  return currentLocale
}

export const changeDateLocale = (localeName: "id" | "en") => {
  dayjs.locale(localeName)
}

export const convertTime = (value: dayjs.ConfigType, format?: string) => {
  const formatDate = format || "DD MMM YYYY HH:mm"
  return dayjs(value).locale(getLocale()).format(formatDate)
}

export const getDayJs = (value?: dayjs.ConfigType) => {
  return dayjs(value)
}
