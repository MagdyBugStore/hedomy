import { storage } from '../../util/localStorage';
import axios from 'axios';

export async function useMyProducts({ limit, pages, productFilters, values,  search }) {
  var genderValue = storage.gettypeid()
  let selectedValues = 'title,images,slug,trending,created,totalSell,discount,brand,ratingScore,price,oldPrice,gender,vendor,group';


  if (values === 'all') {
    selectedValues = 'all';

  } else if (values) {
    selectedValues = values;
  }

  const params = {
    gender: genderValue,
    values: selectedValues,
    limit: limit ?? 10,
    search: search,
  };

  try {
    const response = await axios.get('/api/products/get', { params });
    const products = response.data
    return { error: null, products };
  }
  catch (error) {
    console.log('😥😥');
    console.error(error.message);
    return { error: true, products: [] };
  }
}



export async function ProductsFromUrl({ slug }) {
  
  const params = {
    slug: slug,
  };

  try {
    const response = await axios.get('/api/products/get', { params });
    const products = response.data
    return { error: null, products };
  }
  catch (error) {
    console.log('😥😥');
    console.error(error.message);
    return { error: true, products: [] };
  }
}

export async function setbuyer(formData) {

  try {
    const response = await axios.post('/api/buyer/add', formData);

    console.log('API response:', response.data);

    return 1;
  } catch (error) {
    console.error('Error setting buyer:', error);

    throw error;
  }

}