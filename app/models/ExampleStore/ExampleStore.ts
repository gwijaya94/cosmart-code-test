// @demo remove-file
import { toJS } from "mobx"
import { Instance, SnapshotIn, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { LayoutAnimation } from "react-native"
import { withSetPropAction } from "../helpers/withSetPropAction"

type ListViewType = (typeof listComponentView)[number]
const listComponentView = [
  "button",
  "textLink",
  "icon",
  "input",
  "radioButton",
  "checkBox",
  "modal",
  "bottomSheet",
  "fastImage",
] as const

export const ExampleStoreModel = types
  .model("ExampleStore")
  .props({
    // listComponent: types.array(types.string, listComponentView),
    selectedComponent: types.array(types.enumeration("component", [...listComponentView])),
    radioValue: types.optional(types.string, ""),
    checkboxValue: types.array(types.string),

    isShowModal: types.optional(types.boolean, false),
    isShowSheet: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get getListComponent() {
      return listComponentView
    },
    get getSelectedComponent() {
      return toJS(self.selectedComponent)
    },
    get getCheckboxValue() {
      return toJS(self.checkboxValue)
    },
    get getRadioButtonValue() {
      return toJS(self.radioValue)
    },
  }))
  .actions((self) => ({
    handleSelectComponent(value: ListViewType) {
      const tempValue = self.getSelectedComponent.slice()

      if (tempValue.includes(value)) {
        const valueIndex = tempValue.findIndex((item) => item === value)
        tempValue.splice(valueIndex, 1)
      } else tempValue.push(value)

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      self.setProp("selectedComponent", tempValue)
    },

    handleShowModal(type: "modal" | "sheet") {
      if (type === "modal") {
        self.setProp("isShowModal", !self.isShowModal)
      } else self.setProp("isShowSheet", !self.isShowSheet)
    },

    isComponentIncl(val: ListViewType) {
      return self.getSelectedComponent.includes(val)
    },
  }))

export interface ExampleStore extends Instance<typeof ExampleStoreModel> {}
export interface ExampleStoreSnapshotOut extends SnapshotOut<typeof ExampleStoreModel> {}
export interface ExampleStoreSnapshotIn extends SnapshotIn<typeof ExampleStoreModel> {}
export const createExampleStoreDefaultModel = () => types.optional(ExampleStoreModel, {})
