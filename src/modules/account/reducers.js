import * as Actions from './actions'

export const initialState = {
  accountInformation: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ACCOUNT_INFORMATION.REQUEST:
      return {
        ...state
      }
    case Actions.GET_ACCOUNT_INFORMATION.SUCCESS:
      return {
        ...state,   
        accountInformation: action.payload.data.data
      }
    case Actions.GET_ACCOUNT_INFORMATION.FAILURE:
      return {
        ...state,
        accountInformation: {}
      }
    default:
      return state
  }
}
