import { CLEAN_RESULT, ADD_ERROR_PPN, ADD_ERROR_TEST, SET_NOMBRE_TOTAL_PPN, SET_PPNDISPLAY, SET_NUMPAGE, SET_RECHERCHEPPN, ADD_ERROR_PPN_ERRONNE, SET_CHOIXCATEGORIE, INCREMENTE_SYNCHRO } from '../actions';
import fakedata from '../Components/fakedata.json';
/*const initialState = {
  result: {},
  compteurResult: 0,
  nombreTotalPPN:0,
}; */

const initialState = fakedata;

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAN_RESULT:
      return {
        ...state,
        result: {},
        compteurResult: 0,
        nombreTotalPPN: 0,
        displayVerif: {
          PPNDisplay: 0,
          numPage: 1,
          recherchePPN: '',
        },
        listPPNErronne: [],
        choixCategorie: "",
        compteurErreurPourSynchro: 0
      }

    case ADD_ERROR_PPN:
      state.result[action.payload.PPN] = action.payload;
      return {
        ...state,
        compteurResult: state.compteurResult + 1,
      };
    case ADD_ERROR_PPN_ERRONNE:
      state.listPPNErronne.push(action.payload);
      return {
        ...state,
        compteurResult: state.compteurResult + 1,
      }
    case ADD_ERROR_TEST:
      state.result[111] = {
        PPN: '169450546',
        errors: [
          {
            message: 'valeur présente',
            number: 200,
            code: 'b'
          }
        ]
      }
      return {
        ...state,
        compteurResult: state.compteurResult + 1,
      };
    case SET_NOMBRE_TOTAL_PPN:
      return {
        ...state,
        nombreTotalPPN: action.payload,
      }
    case SET_PPNDISPLAY:
      return {
        ...state,
        displayVerif: {
          ...state.displayVerif,
          PPNDisplay: action.payload,
        }
      }
    case SET_NUMPAGE:
      return {
        ...state,
        displayVerif: {
          ...state.displayVerif,
          numPage: action.payload.numPage
        }
      }
    case SET_RECHERCHEPPN:
      return {
        ...state,
        displayVerif: {
          ...state.displayVerif,
          recherchePPN: action.payload,
        }
      }
    case SET_CHOIXCATEGORIE:
      return {
        ...state,
        choixCategorie: action.payload
      }
    case INCREMENTE_SYNCHRO:
      return {
        ...state,
        compteurErreurPourSynchro: state.compteurErreurPourSynchro + 1
      }
  }
  return state;
}
export default rootReducer;
