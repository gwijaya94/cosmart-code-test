import { observer } from "mobx-react-lite"
import * as React from "react"
import { ActivityIndicator, Image as RNImage, StyleSheet } from "react-native"
import FastImage, { FastImageProps, ImageStyle as RNFImageStyle } from "react-native-fast-image"
import { colors, getColor, mStyles } from "~/theme"

export interface ImageStyle extends RNFImageStyle {}

export interface ImageProps extends FastImageProps {
  autosize?: boolean
  initialAspectRatio?: number
  hasLoading?: boolean
  loaderSize?: number | "small" | "large"
  onLoadEnd?: () => void
}

export const Image = observer(function Image(props: ImageProps) {
  const { autosize, loaderSize = "small", hasLoading = true, initialAspectRatio = 1 } = props
  const { defaultSource, style, onLoadEnd, ...rest } = props

  const [aspectRatio, setAspectRatio] = React.useState<number>(initialAspectRatio)
  const [defaultAspectRatio, setDefaultAspectRatio] = React.useState<number>(initialAspectRatio)
  const [isDoneLoadImg, setIsDoneLoadImg] = React.useState<boolean>(false)
  const [isDoneGetSize, setIsDoneGetSize] = React.useState<boolean>(false)

  const tempAspectRatio = defaultSource && !isDoneLoadImg ? defaultAspectRatio : aspectRatio

  const styles = styling(autosize, tempAspectRatio)

  React.useLayoutEffect(() => {
    if (!autosize) return

    setIsDoneGetSize(false)
    if (typeof props.source !== "number" && props.source?.uri) {
      RNImage.getSize(props.source?.uri, (width, height) => {
        setAspectRatio(width / height)
        setIsDoneGetSize(true)
      })
    } else {
      const { width, height } = RNImage.resolveAssetSource(props.source as number)
      setAspectRatio(width / height)
      setIsDoneGetSize(true)
    }
  }, [props.source, autosize])

  React.useLayoutEffect(() => {
    if (defaultSource) {
      const { width, height } = RNImage.resolveAssetSource(defaultSource)
      setDefaultAspectRatio(width / height)
    }
  }, [defaultSource])

  const onLoadImageEnd = () => {
    setIsDoneLoadImg(true)
    onLoadEnd && onLoadEnd()
  }

  return (
    <FastImage {...rest} onLoadEnd={onLoadImageEnd} style={[styles.imageContent, style]}>
      {hasLoading && !(isDoneLoadImg || isDoneGetSize) && (
        <ActivityIndicator size={loaderSize} style={styles.loaderStyle} color={colors.secondary} />
      )}
    </FastImage>
  )
})

const styling = (autosize: boolean, aspectRatio: number) =>
  StyleSheet.create({
    imageContent: { ...(autosize && { aspectRatio }), justifyContent: "center" } as ImageStyle,
    loaderStyle: {
      ...getColor("white").backgroundColor,
      ...mStyles.flex,
    },
  })
