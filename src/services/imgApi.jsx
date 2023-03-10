import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '32995657-5d5fba1f78fb808676eb60a6f';

export async function fetchImg(name, page) {
  const response = await axios(
    `?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
}
