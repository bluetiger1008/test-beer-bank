import axios from 'axios';

const searchBeerAPI = (params = null) => {
  return axios.get(`https://api.punkapi.com/v2/beers${params || ''}`);
};

export { searchBeerAPI };
