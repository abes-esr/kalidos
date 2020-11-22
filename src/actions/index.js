export const CLEAN_RESULT = 'CLEAN_RESULT';
export const ADD_ERROR_PPN = 'ADD_ERROR_PPN';
export const ADD_ERROR_PPN_ERRONNE = 'ADD_ERROR_PPN_ERRONNE';
export const ADD_ERROR_TEST = 'ADD_ERROR_TEST';
export const SET_NOMBRE_TOTAL_PPN = 'SET_NOMBRE_TOTAL_PPN';
export const SET_PPNDISPLAY = 'SET_PPNDISPLAY';
export const SET_NUMPAGE = 'SET_NUMPAGE';
export const SET_RECHERCHEPPN = 'SET_RECHERCHEPPN';

export function cleanResult(payload) {
  return { type: CLEAN_RESULT, payload };
}

export function addErrorPPN(payload) {
  return { type: ADD_ERROR_PPN, payload };
}

export function addErrorTest(payload) {
  return { type: ADD_ERROR_TEST, payload };
}

export function addErrorPPNErronnee(payload) {
  return { type: ADD_ERROR_PPN_ERRONNE, payload };
}

export function setNombreTotalPPN(payload) {
  return { type: SET_NOMBRE_TOTAL_PPN, payload };
}

export function setPPNDisplay(payload) {
  return { type: SET_PPNDISPLAY, payload };
}

export function setNumPage(payload) {
  return { type: SET_NUMPAGE, payload };
}

export function setRecherchePPN(payload) {
  return { type: SET_RECHERCHEPPN, payload };
}