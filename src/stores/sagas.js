import { all } from 'redux-saga/effects'
import { apiCallWatcher } from '../utils/callApi'
// import navigateWatcher from '@utils/navigator'
// import { accountWatcher } from '@modules/account/sagas'

export default function* rootSaga() {
  yield all([
    apiCallWatcher(),
    // accountWatcher(),
    // navigateWatcher()
  ])
}