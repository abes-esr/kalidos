import { CLEAN_RESULT, ADD_ERROR_PPN, ADD_ERROR_TEST, SET_NOMBRE_TOTAL_PPN } from '../actions';

const initialState = {
  result: {
    '169450546': {
      PPN: '169450546',
      errors: [
        {
          message: 'valeur présente',
          number: 200,
          code: 'b'
        }
      ]
    }
  },
  compteurResult: 1,
  nombreTotalPPN:1,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAN_RESULT:
      return {
        ...state,
        result: {},
        compteurResult: 0,
        nombreTotalPPN: 0,
      }

    case ADD_ERROR_PPN:
      state.result[action.payload.PPN] = action.payload;
      return {
        ...state,
        compteurResult: state.compteurResult + 1,
      };
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
  }
  return state;
}
export default rootReducer;
