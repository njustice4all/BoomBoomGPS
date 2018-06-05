import { URI } from '../config/constants';

export const API = {
  /**
   * initial or refresh
   */
  getAllShops: () =>
    fetch(`${URI}?_page=1&_limit=15`)
      .then(response => response.json())
      .then(json => json),
  // getAllShops: () =>
  //   fetch(`${URI}?seed=1&page=1&results=20`)
  //     .then(response => response.json())
  //     .then(json => json),

  /**
   * load more
   */
  loadMoreShops: page =>
    fetch(`${URI}?_page=${page}&_limit=15`)
      .then(response => response.json())
      .then(json => json),
  // loadMoreShops: page => fetch(`${URI}?seed=1&page=${page}&results=20`)
  //   .then(response => response.json())
  //   .then(json => json),
};
