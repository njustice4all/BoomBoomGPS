const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((accumulator, type) => {
    accumulator[type] = `${base}_${type}`;
    return accumulator;
  }, {});
}

function actionCreator(type, payload = {}) {
  return { type, ...payload };
}

export const GET_ALL_SHOPS = createRequestTypes('GET_ALL_SHOPS');
export const LOAD_MORE_SHOPS = createRequestTypes('LOAD_MORE_SHOPS');

export const actionGetAllShops = {
  request: () => actionCreator(GET_ALL_SHOPS[REQUEST]),
  success: response => actionCreator(GET_ALL_SHOPS[SUCCESS], response),
  failure: error => actionCreator(GET_ALL_SHOPS[FAILURE], error),
};

export const actionLoadMoreShops = {
  request: () => actionCreator(LOAD_MORE_SHOPS[REQUEST]),
  success: response => actionCreator(LOAD_MORE_SHOPS[SUCCESS], response),
  failure: error => actionCreator(LOAD_MORE_SHOPS[FAILURE], error),
};
