import * as Actions from './actions'

export const initialState = {
    AllCompanyInformation: {},
 
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_ALLCOMPANY_INFORMATION.REQUEST:
            return {
                ...state
            }
        case Actions.GET_ALLCOMPANY_INFORMATION.SUCCESS:

            return {
                ...state,
                AllCompanyInformation: action.payload.data
            }
        case Actions.GET_ALLCOMPANY_INFORMATION.FAILURE:
            return {
                ...state,
                AllCompanyInformation: {}
            }     
        default:
            return state
    }
}
