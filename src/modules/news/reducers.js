import * as Actions from './actions'

export const initialState = {
  newsInformation: {},
  allNewsInformation: {},
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
    case Actions.GET_ALLNEWS_INFORMATION.REQUEST:
      return {
        ...state
      }
    case Actions.GET_ALLNEWS_INFORMATION.SUCCESS:

      return {
        ...state,
        allNewsInformation: action.payload.data
      }
    case Actions.GET_ALLNEWS_INFORMATION.FAILURE:
      return {
        ...state,
        allNewsInformation: {}
      }
    default:
      return state
  }
}


