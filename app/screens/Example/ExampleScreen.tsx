// @demo remove-file
import { observer } from "mobx-react-lite"
import React from "react"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import {
  BottomSheet,
  Button,
  Checkbox,
  Icon,
  Image,
  ImageStyle,
  Input,
  Modal,
  RadioButton,
  Screen,
  Text,
} from "~/components"
import { useStores } from "~/models"
import { ScreenStackProps } from "~/navigators"
import { mStyles, spacing, typography } from "~/theme"
import { getCamelCaseText, showToast } from "~/utils/function"
import { getRoute } from "~/utils/navigatorHelper"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `example: undefined` to AppStackParamList on navigation-helper.ts
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="example" component={ExampleScreen} />`
// Hint: Look for the 🔥!

export const ExampleScreen: ScreenStackProps<"example"> = observer(function ExampleScreen({
  navigation,
  route,
}) {
  // Pull in one of our MST stores
  const { exampleStore } = useStores()
  const routeOpt = getRoute(route)

  const listComponent = exampleStore.getListComponent
  const showModal = exampleStore.isShowModal
  const showBottomSheet = exampleStore.isShowSheet
  const radioValue = exampleStore.getRadioButtonValue
  const checkedBoxValue = exampleStore.getCheckboxValue

  const radioButtonValue = [
    { label: "Label 1", value: "1" },
    { label: "Label 2", value: 2 },
    { label: "Label 3", value: "3" },
  ]

  const isViewIncluded = (val: (typeof listComponent)[number]) => {
    return exampleStore.getSelectedComponent.includes(val)
  }

  const onPressRadioButton = (value: string) => {
    exampleStore.setProp("radioValue", value)
    showToast(`${value} Selected`, 1000)
  }

  const onPressCheckedBox = (value: string) => {
    const tempValue = checkedBoxValue.slice()

    if (tempValue.includes(value)) {
      const valueIndex = tempValue.findIndex((item) => item === value)
      tempValue.splice(valueIndex, 1)
    } else tempValue.push(value)

    exampleStore.setProp("checkboxValue", tempValue)
    showToast(`${value} Selected`, 1000)
  }

  const onPressedShowView = (val: (typeof listComponent)[number]) => {
    exampleStore.handleSelectComponent(val)
  }
  const onTriggerPopUp = (type: "modal" | "sheet") => exampleStore.handleShowModal(type)

  return (
    <Screen routeOpt={routeOpt} preset="fixed">
      <Modal
        isVisible={showModal}
        title="MODAL TITLE"
        content="Here goes your content Here goes your content Here goes your content"
        onCloseModal={() => onTriggerPopUp("modal")}
      />
      <BottomSheet
        isVisible={showBottomSheet}
        onCloseModal={() => onTriggerPopUp("sheet")}
        title="Title BottomSheet"
      >
        {[0, 0, 0].map((item, index) => (
          <Text key={index} text={`${index + 1}-text`} style={styling.bottomSheetContentText} />
        ))}
      </BottomSheet>

      <FlatList
        data={listComponent}
        numColumns={2}
        style={mStyles.flex}
        contentContainerStyle={mStyles.paddingPage}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Checkbox
              key={item}
              label={getCamelCaseText(item)}
              value={item}
              checked={isViewIncluded(item)}
              onPress={onPressedShowView}
            />
          )
        }}
        ListHeaderComponent={
          <Text text="Select one or more components to show:" style={styling.headerText} />
        }
        ListFooterComponent={
          <>
            <Button
              title="Navigate to Example Api"
              onPress={() => navigation.navigate("exampleApi")}
            />
            <Text text="List Components:" style={styling.headerText} />
            {/* BUTTON */}
            {isViewIncluded("button") && (
              <View style={styling.wrapperInline}>
                <Button title={"Button"} />
                <Button title={"Button"} buttonSize="medium" buttonType="secondary" />
                <Button title={"Button"} buttonSize="small" disabled />
              </View>
            )}

            {/* TEXT */}
            {isViewIncluded("textLink") && (
              <View style={styling.wrapperInline}>
                <Text
                  text="LINK HERE"
                  onPress={() => showToast("CLICKED TEXT")}
                  style={styling.text}
                />
                <Text
                  text="LINK HERE"
                  disabled
                  onPress={() => showToast("CLICKED TEXT")}
                  style={styling.text}
                />
              </View>
            )}

            {/* ICON */}
            {isViewIncluded("icon") && (
              <View style={styling.wrapperInline}>
                <Icon name="android" iconColor="secondary" />
                <Icon name="google" iconColor="error" />
                <Icon name="cog" iconColor="line" />
              </View>
            )}

            {/* INPUT */}
            {isViewIncluded("input") && (
              <View>
                <Input placeholder="It's placeholder" errorMessage="This is error message" />
                <Input isPassword defaultValue="It's a default value" />
                <Input
                  disabled
                  defaultValue="Disabled Value"
                  rightIcon={{
                    name: "help-circle",
                    onPress: () => showToast("CLICKED ICON INPUT"),
                  }}
                />
                <Input defaultValue="Multi line text" numberOfLines={3} multiline />
              </View>
            )}

            {/* RADIO BUTTON */}
            {isViewIncluded("radioButton") && (
              <View style={styling.wrapperInline}>
                <Text style={styling.text}>{radioValue}</Text>
                {radioButtonValue.map((item) => {
                  return (
                    <RadioButton
                      label={item.label}
                      value={item.value.toString()}
                      selected={radioValue === item.value.toString()}
                      key={item.label}
                      onPress={onPressRadioButton}
                    />
                  )
                })}
              </View>
            )}

            {/* CHECKBOX */}
            {isViewIncluded("checkBox") && (
              <View style={styling.wrapperInline}>
                <Text style={styling.text}>{checkedBoxValue.toString()}</Text>
                {radioButtonValue.map((item) => {
                  const itemValue = item.value.toString()
                  return (
                    <Checkbox
                      key={item.value}
                      label={item.label}
                      value={itemValue}
                      checked={checkedBoxValue.includes(itemValue)}
                      onPress={onPressCheckedBox}
                    />
                  )
                })}
              </View>
            )}

            {/* MODAL & BOTTOMSHEET */}
            {(isViewIncluded("modal") || isViewIncluded("bottomSheet")) && (
              <View style={styling.wrapperInline}>
                {isViewIncluded("modal") && (
                  <Button title="Show Modal" onPress={() => onTriggerPopUp("modal")} />
                )}
                {isViewIncluded("bottomSheet") && (
                  <Button title="Show BottomSheet" onPress={() => onTriggerPopUp("sheet")} />
                )}
              </View>
            )}

            {/* FAST IMAGE */}
            {isViewIncluded("fastImage") && (
              <View style={styling.wrapperInline}>
                <Image
                  style={styling.image}
                  source={{ uri: "https://unsplash.it/400/400?image=1" }}
                />
                <Image
                  style={styling.imageAutoSize}
                  source={{ uri: "https://unsplash.it/400/400?image=1" }}
                  autosize
                />
              </View>
            )}
          </>
        }
      />
    </Screen>
  )
})

const styling = {
  root: {
    ...mStyles.paddingPage,
  } as ViewStyle,

  text: {
    ...typography.textCenter,
    ...mStyles.flex,
  } as TextStyle,

  wrapper: {
    marginBottom: 15,
  } as ViewStyle,

  wrapperInline: {
    ...mStyles.centerInline,
    justifyContent: "space-around",
    marginBottom: 15,
  } as ViewStyle,

  headerText: {
    ...typography.primaryBold,
    marginBottom: 15,
  } as TextStyle,

  bottomSheetContentText: { paddingHorizontal: spacing.md } as ViewStyle,
  image: { width: 200, aspectRatio: 1 } as ImageStyle,
  imageAutoSize: { width: 200 } as ImageStyle,
}
