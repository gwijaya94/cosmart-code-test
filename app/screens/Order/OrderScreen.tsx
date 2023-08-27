/* eslint-disable react-native/sort-styles */
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { FlatList, StyleSheet } from "react-native"
import { OrderItem, Screen } from "~/components"
import { useStores } from "~/models"
import { ScreenStackProps } from "~/navigators"
import { mStyles } from "~/theme"
import { getRoute } from "~/utils/navigatorHelper"

export const OrderScreen: ScreenStackProps<"Order"> = observer(function OrderScreen(props) {
  const { navigation, route } = props
  const { orderStore } = useStores()

  const routeOpt = getRoute(route)
  const orderData = orderStore.getOrderList

  useEffect(() => {
    onFetchData()
  }, [])

  const onFetchData = () => {
    orderStore.handleGetOrderData()
  }

  return (
    <Screen style={styles.root} routeOpt={routeOpt} preset="fixed">
      <FlatList
        data={orderData}
        keyExtractor={(item, index) => item.pickupDate + index}
        renderItem={({ item, index }) => <OrderItem item={item} index={index} />}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {
    ...mStyles.paddingPage,
  },
})
