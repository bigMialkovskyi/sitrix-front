import axios from 'axios';
import productList from './productList';

// const  productList = require ('./productList.json');

const fetchAvailableProducts = async () => {
	return axios
		.get(`/products/get/all`)
		.then(res => res.data.products)
		.catch(e => {
			console.error(e);
			return productList;
		});
};

const fetchAvailableProductsAs = async () => {
	try {
		const response = await axios.get('/products/get/all');
		console.log(response)
		return response
		// console.log(response);
	} catch (error) {
		console.error(error);
	}
};

const fetchProducts = async () => {
	return axios
		.get(`/products/get/all`)
		.then(res => res.data.products)
		.catch(e => {
			console.error(e);
			return productList;
		});
};

export const productApi = {
	fetchAvailableProducts,
	fetchAvailableProductsAs,
	fetchProducts,
	productList
};