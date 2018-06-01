import { call, put, take, takeEvery, all, fork, select } from 'redux-saga/effects';

import { actionGetAllShops, actionLoadMoreShops } from '../actions/actionTypes';
import { getPaginationData } from '../reducers/selectors';
import { API } from '../services';

/** *************************************************************************** */
/** ****************************** WORKERS ************************************ */
/** *************************************************************************** */

function* getAllShops() {
  const response = yield call(API.getAllShops);

  if (!response) {
    yield put(actionGetAllShops.failure({ error: true }));
  } else {
    yield put(actionGetAllShops.success({ payload: response }));
  }
}

function* loadMoreShops(page) {
  const response = yield call(API.loadMoreShops, page);

  if (!response) {
    yield put(actionLoadMoreShops.failure({ error: true }));
  } else {
    yield put(actionLoadMoreShops.success({ payload: response }));
  }
}

/** *************************************************************************** */
/** ***************************** WATCHERS ************************************ */
/** *************************************************************************** */

function* watchGetAllShops() {
  yield takeEvery(actionGetAllShops.request().type, getAllShops);
}

function* watchLoadMoreShops() {
  while (true) {
    const { page } = yield select(getPaginationData);
    yield take(actionLoadMoreShops.request().type);
    yield fork(loadMoreShops, page + 1);
  }
}

export default function* rootSaga() {
  yield all([fork(watchGetAllShops), fork(watchLoadMoreShops)]);
}
