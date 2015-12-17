const state = {};

export const setState = (key, value) => {
  if (key) {
    state[key] = value;
  }
};

export const getState = key => {
  if (key) {
    return state[key];
  }
};
