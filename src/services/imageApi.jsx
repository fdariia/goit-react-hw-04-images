import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '34173138-558a9ee15c3093426fbf117d9';

export const getImage = async (page, category) => {
  return await axios.get(
    `/?q=${category}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
