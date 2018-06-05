import { GET_ALL_SHOPS, LOAD_MORE_SHOPS } from '../actions/actionTypes';

/**
 * TODO:
 * 현재 패턴은 뭔가 반복되는 느낌이다
 * 리팩포링을 하자...
 */
const fetching = (state, action) =>
  Object.assign({}, state, {
    ...state,
    isFetching: true,
  });

const getAllShops = (state, action) =>
  Object.assign({}, state, {
    ...state,
    isFetching: false,
    // info: action.payload.info,
    lists: action.payload,
  });

const loadMoreShops = (state, action) =>
  Object.assign({}, state, {
    ...state,
    isFetching: false,
    info: action.payload.info,
    lists: [...state.lists, ...action.payload],
  });

const initialState = {
  lists: [],
  isFetching: false,
  refreshing: false,
  info: {
    seed: 1,
    results: 20,
    page: 1,
    version: '',
  },
};

export default function shop(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SHOPS.REQUEST:
    case LOAD_MORE_SHOPS.REQUEST:
      return fetching(state, action);
    case GET_ALL_SHOPS.SUCCESS:
      return getAllShops(state, action);
    case LOAD_MORE_SHOPS.SUCCESS:
      return loadMoreShops(state, action);
    case GET_ALL_SHOPS.FAILURE:
    case LOAD_MORE_SHOPS.FAILURE:
      return state;
    default:
      return state;
  }
}
