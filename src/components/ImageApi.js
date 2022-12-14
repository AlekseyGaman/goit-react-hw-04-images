import axios from 'axios';

const fetchApi = async (name, page) => {
  const apiSearch = `https://pixabay.com/api/?q=${name}&page=${page}&key=30833881-2a0b5d994d787ba4a8b90c425&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(apiSearch);
  return response.data;
};

export default fetchApi;
