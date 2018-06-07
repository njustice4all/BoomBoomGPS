import { GET_ALL_SHOPS, LOAD_MORE_SHOPS } from '../actions/actionTypes';

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
      return {
        ...state,
        isFetching: true,
      };
    case GET_ALL_SHOPS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        // info: action.payload.info,
        lists: action.payload,
      };
    case LOAD_MORE_SHOPS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        info: action.payload.info,
        lists: [...state.lists, ...action.payload],
      };
    case GET_ALL_SHOPS.FAILURE:
    case LOAD_MORE_SHOPS.FAILURE:
      return state;
    default:
      return state;
  }
}
