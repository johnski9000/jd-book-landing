import axios from 'axios';

export default async (req, res) => {
  try {
    const axiosRes = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = axiosRes.data;
  } catch (e) {
    console.error(e);
    res.status(e.status || 400).json({message: 'Api error'});
  }
}
