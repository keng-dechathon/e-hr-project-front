export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'
export const CLEAR = 'CLEAR'

export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE, CLEAR].reduce((index, type) => {
    index[type] = `${base}_${type}`
    return index
  }, {})
}

export const createAction = (
  type,
  payload = {},
  fetchConfig
) => ({
  type,
  payload,
  fetchConfig
})
