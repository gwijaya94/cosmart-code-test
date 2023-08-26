import { Icon as RNEIcon, IconProps as RNEIconProps } from "@rneui/base"
import * as React from "react"
import { ColorItem, colors } from "~/theme"

export interface IconProps extends Omit<RNEIconProps, "color" | "name"> {
  name?: string
  type?: string
  iconColor?: ColorItem
}

export function Icon(props: IconProps) {
  const { type = "material-community", iconColor, selectionColor, name = "google", ...rest } = props

  return <RNEIcon {...rest} name={name} type={type} color={selectionColor ?? colors[iconColor]} />
}
