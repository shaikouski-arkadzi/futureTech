import BaseComponent from "./BaseComponent.js";

const rootSelector = "[data-js-select]";

class Select extends BaseComponent {
  selectors = {
    root: rootSelector,
    originalControl: "[data-js-select-original-control]",
    button: "[data-js-select-button]",
    dropdown: "[data-js-select-dropdown]",
    option: "[data-js-select-option]",
  };

  stateClasses = {
    isExpanded: "is-expanded",
    isSelected: "is-selected",
    isCurrent: "is-current",
    isOnTheLeftSide: "is-on-the-left-side",
    isOnTheRightSide: "is-on-the-right-side",
  };

  stateAttributes = {
    ariaExpanded: "aria-expanded",
    ariaSelected: "aria-selected",
    ariaActiveDescendant: "aria-activedescendant",
  };

  initialState = {
    isExpanded: false,
    currentOptionIndex: null,
    selectedOptionElement: null,
  };

  constructor(rootElement) {
    super();
    this.rootElement = rootElement;
    this.originalControlElement = this.rootElement.querySelector(
      this.selectors.originalControl
    );
    this.buttonElement = this.rootElement.querySelector(this.selectors.button);
    this.dropdownElement = this.rootElement.querySelector(
      this.selectors.dropdown
    );
    this.optionElements = this.dropdownElement.querySelectorAll(
      this.selectors.option
    );
    this.state = this.getProxyState({
      ...this.initialState,
      currentOptionIndex: this.originalControlElement.selectedIndex,
      selectedOptionElement:
        this.optionElements[this.originalControlElement.selectedIndex],
    });
  }
}

class SelectCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Select(element);
    });
  }
}

export default SelectCollection;
