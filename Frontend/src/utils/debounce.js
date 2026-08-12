let lastTimeout;
const withDebounce = (fn, delay) => {
  return (...args) => {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default withDebounce;
