import { URI } from '../config/constants';

export const API = {
  /**
   * initial or refresh
   */
  getAllShops: () =>
    fetch(`${URI}?seed=1&page=1&results=20`)
      .then(response => response.json())
      .then(json => json),

  /**
   * load more
   */
  loadMoreShops: page => fetch(`${URI}?seed=1&page=${page}&results=20`)
    .then(response => response.json())
    .then(json => json),
};
