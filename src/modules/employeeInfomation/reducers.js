import * as Actions from './actions'

export const initialState = {
    empInformation: {},
    empInformationByID: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_EMPINFO_INFORMATION.REQUEST:
            return {
                ...state
            }
        case Actions.GET_EMPINFO_INFORMATION.SUCCESS:

            return {
                ...state,
                empInformation: action.payload.data
            }
        case Actions.GET_EMPINFO_INFORMATION.FAILURE:
            return {
                ...state,
                empInformation: {}
            }
        case Actions.GET_EMPBYID_INFORMATION.REQUEST:           
            return {
                ...state
            }
        case Actions.GET_EMPBYID_INFORMATION.SUCCESS:

            return {
                ...state,
                empInformationByID: action.payload.data
            }
        case Actions.GET_EMPBYID_INFORMATION.FAILURE:
            return {
                ...state,
                empInformationByID: {}
            }
        default:
            return state
    }
}
