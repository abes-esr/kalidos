export const CLEAN_RESULT = 'CLEAN_RESULT';
export const ADD_ERROR_PPN = 'ADD_ERROR_PPN';
export const ADD_ERROR_PPN_ERRONNE = 'ADD_ERROR_PPN_ERRONNE';
export const ADD_ERROR_TEST = 'ADD_ERROR_TEST';
export const SET_NOMBRE_TOTAL_PPN = 'SET_NOMBRE_TOTAL_PPN';
export const SET_PPNDISPLAY = 'SET_PPNDISPLAY';
export const SET_NUMPAGE = 'SET_NUMPAGE';
export const SET_RECHERCHEPPN = 'SET_RECHERCHEPPN';
export const SET_CHOIXCATEGORIE = 'SET_CHOIXCATEGORIE';
export const INCREMENTE_SYNCHRO = 'INCREMENTE_SYNCHRO';
export const SET_NOTICEDISPLAY = 'SET_NOTICEDISPLAY';

export function incrementeSynchro(payload) {
  return {type: INCREMENTE_SYNCHRO, payload};
}

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

export function setChoixCategorie(payload) {
  return { type: SET_CHOIXCATEGORIE, payload };
}

export function setNoticeDisplay(payload) {
  return { type: SET_NOTICEDISPLAY, payload };
}
