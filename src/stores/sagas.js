import { all } from 'redux-saga/effects'
import { apiCallWatcher } from '../utils/callApi'
// import { accountWatcher } from '../modules/identity/sagas'


export default function* rootSaga() {
  yield all([
    apiCallWatcher(),
    // accountWatcher(),
  ])
}