import { takeEvery, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { getCookieFromBrowser } from './cookie'

const configApi = async (action = {}) => {
  const { fetchConfig = {}, payload } = action
  const { method, url, header, params, fixBaseURL } = fetchConfig
  let defaultHeader = {   
    'Authorization': `Bearer ${getCookieFromBrowser('a') ? getCookieFromBrowser('a') : ''}`,
  }
  return await axios({
    baseURL: fixBaseURL || process.env.React_App_API_URL,
    method: method || 'GET',
    url: url || '',
    headers: header || defaultHeader,
    params: params || {},
    data: payload || {}
  })
}

export function* requestApi(action) {
  
  try {
    const response = yield call(configApi, action)
    let type = action.type.split('_')
    type.pop()
    const actionType = type.join('_')
    const successType = actionType + '_SUCCESS'
    yield put({
      type: successType,
      payload: response
    })
  } catch (error) {
    console.log(error)
    let type = action.type.split('_')
    type.pop()
    const actionType = type.join('_')
    const errorType = actionType + '_FAILURE'
    yield put({
      type: errorType,
      payload: error.response
    })
  }
}

export function* apiCallWatcher() {

  yield takeEvery(action => /_REQUEST$/.test(action.type), requestApi)
}
