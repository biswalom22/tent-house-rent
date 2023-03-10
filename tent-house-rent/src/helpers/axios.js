import axios from 'axios';
import { baseUrl } from '../baseUrl/baseurl';

const token = localStorage.getItem('token');

const axiosIntance = axios.create({
	baseURL: baseUrl,
	headers: {
		authorization: token
	}
});

export default axiosIntance;
