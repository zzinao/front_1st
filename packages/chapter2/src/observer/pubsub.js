let currentObserver = null;

export const 구독 = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

export const 발행기관 = (obj) => {
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return value;
      },
      set(newValue) {
        value = newValue;
        observers.forEach((fn) => fn());
      },
    });
  });
  return obj;
};
