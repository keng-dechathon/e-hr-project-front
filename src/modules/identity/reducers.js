import * as Actions from './actions'

export const initialState = {
  accountInformation: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ACCOUNT_INFORMATION.REQUEST:
      console.log('req');
      return {
        ...state
      }
    case Actions.GET_ACCOUNT_INFORMATION.SUCCESS:
      console.log('success');
      return {
        ...state,   
        accountInformation: action.payload.data.data
      }
    case Actions.GET_ACCOUNT_INFORMATION.FAILURE:
      console.log('fail');
      return {
        ...state,
        accountInformation: {}
      }
    default:
      return state
  }
}
