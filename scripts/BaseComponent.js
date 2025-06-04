class BaseComponent {
  constructor() {
    // Deprecate creation of instances of the BaseComponent class
    if (this.constructor === BaseComponent) {
      throw new Error(
        "Невозможно создать экземпляр абстрактного класса BaseComponent!"
      );
    }
  }

  // Automatically update the UI (by calling this.updateUI()) whenever activeTabIndex changes
  // Like useEffect in React
  getProxyState(initialState) {
    return new Proxy(initialState, {
      get: (target, prop) => {
        return target[prop];
      },
      set: (target, prop, newValue) => {
        const oldValue = target[prop];

        target[prop] = newValue;

        if (newValue !== oldValue) {
          this.updateUI();
        }

        return true;
      },
    });
  }

  // Select the appropriate function based on the key
  // Suppose event.code === "ArrowLeft", then
  // will called this.previousTab function

  updateUI() {
    throw new Error("Необходимо реализовать метод updateUI!");
  }
}

export default BaseComponent;
