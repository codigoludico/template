import types from "engine/types";

export function add(a,b) {
  if (!types.isNumeric(a) || !types.isNumeric(b)) {
    return NaN;
  }
  return a + b;
}

export function sub(a,b) {
  if (!types.isNumeric(a) || !types.isNumeric(b)) {
    return NaN;
  }
  return a - b;
}

export function mul(a,b) {
  if (!types.isNumeric(a) || !types.isNumeric(b)) {
    return NaN;
  }
  return a * b;
}

export function div(a,b) {
  if (!types.isNumeric(a) || !types.isNumeric(b)) {
    return NaN;
  }
  return a / b;
}

export default {
  add,
  sub,
  mul,
  div
};
