export const CLEAN_RESULT = 'CLEAN_RESULT';
export const ADD_ERROR_PPN = 'ADD_ERROR_PPN';
export const ADD_ERROR_TEST = 'ADD_ERROR_TEST';
export const SET_NOMBRE_TOTAL_PPN = 'SET_NOMBRE_TOTAL_PPN';

export function cleanResult(payload) {
  return { type: CLEAN_RESULT, payload };
}

export function addErrorPPN(payload) {
  return { type: ADD_ERROR_PPN, payload };
}

export function addErrorTest(payload) {
  return { type: ADD_ERROR_TEST, payload };
}

export function setNombreTotalPPN(payload) {
  return { type: SET_NOMBRE_TOTAL_PPN, payload };
}