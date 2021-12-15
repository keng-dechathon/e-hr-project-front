import * as Actions from './actions'

export const initialState = {
  newsInformation: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_NEWS_INFORMATION.REQUEST:
      return {
        ...state
      }
    case Actions.GET_NEWS_INFORMATION.SUCCESS:
 
      return {
        ...state,
        newsInformation: action.payload.data
      }
    case Actions.GET_NEWS_INFORMATION.FAILURE:
      return {
        ...state,
        newsInformation: {}
      }
    default:
      return state
  }
}
