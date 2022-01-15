import * as Actions from './actions'

export const initialState = {
    AllPositionInformation: {},
 
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_ALLPOSITION_INFORMATION.REQUEST:
            return {
                ...state
            }
        case Actions.GET_ALLPOSITION_INFORMATION.SUCCESS:

            return {
                ...state,
                AllPositionInformation: action.payload.data
            }
        case Actions.GET_ALLPOSITION_INFORMATION.FAILURE:
            return {
                ...state,
                AllPositionInformation: {}
            }     
        default:
            return state
    }
}
