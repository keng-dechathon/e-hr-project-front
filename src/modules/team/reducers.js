import * as Actions from './actions'

export const initialState = {
    teamsInformation: {},
    memberInformation: {},
    teamInformationById:{},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_TEAMS_INFORMATION.REQUEST:
            return {
                ...state
            }
        case Actions.GET_TEAMS_INFORMATION.SUCCESS:

            return {
                ...state,
                teamsInformation: action.payload.data
            }
        case Actions.GET_TEAMS_INFORMATION.FAILURE:
            return {
                ...state,
                teamsInformation: {}
            }
        case Actions.GET_MEMBERS_INFORMATION.REQUEST:
            return {
                ...state
            }
        case Actions.GET_MEMBERS_INFORMATION.SUCCESS:          
            return {
                ...state,
                memberInformation: action.payload.data
            }
        case Actions.GET_MEMBERS_INFORMATION.FAILURE:
            return {
                ...state,
                memberInformation: {}
            }
            case Actions.GET_TEAMSBYID_INFORMATION.REQUEST:
                return {
                    ...state
                }
            case Actions.GET_TEAMSBYID_INFORMATION.SUCCESS:          
                return {
                    ...state,
                    teamInformationById: action.payload.data
                }
            case Actions.GET_TEAMSBYID_INFORMATION.FAILURE:
                return {
                    ...state,
                    teamInformationById: {}
                }
        default:
            return state
    }
}


