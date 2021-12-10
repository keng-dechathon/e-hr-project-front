import * as Actions from './actions'

export const initialState = {
  leaveInformation: {}
}

export default (state = initialState, action) => {
  switch (action.type) {  
    case Actions.GET_LEAVE_INFORMATION.REQUEST:
      return {
        ...state
      }
    case Actions.GET_LEAVE_INFORMATION.SUCCESS:
      return {
        ...state,
        leaveInformation: action.payload.data
      }
    case Actions.GET_LEAVE_INFORMATION.FAILURE:
      return {
        ...state,
        leaveInformation: {}
      }
    default:
      return state
  }
}
