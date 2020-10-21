import { CLEAN_RESULT, ADD_ERROR_PPN, ADD_ERROR_TEST } from '../actions';
  
  const initialState = {  result: {
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
  }
  };

  function rootReducer(state = initialState, action) {
    switch (action.type) {
        case CLEAN_RESULT:
            return {
                ...state,
                result:{}
            }
            
        case ADD_ERROR_PPN:
            state.result[action.payload.PPN]=action.payload;
            return {...state};
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
            return state;
    }
    return state;
  }
  export default rootReducer;
  