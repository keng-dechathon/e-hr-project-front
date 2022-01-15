import * as Actions from './actions'

export const initialState = {
    AllRoleInformation: {},
 
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_ALLROLE_INFORMATION.REQUEST:
            return {
                ...state
            }
        case Actions.GET_ALLROLE_INFORMATION.SUCCESS:

            return {
                ...state,
                AllRoleInformation: action.payload.data
            }
        case Actions.GET_ALLROLE_INFORMATION.FAILURE:
            return {
                ...state,
                AllRoleInformation: {}
            }     
        default:
            return state
    }
}
