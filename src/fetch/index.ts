import API from '../utilities/axios';

export const userLogin = async ({ id, password }: { id: string; password: string }) => {
  try {
    const response = await API.post('/login', {
      id,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUerInfo = async (userId: string) => {
  try {
    const response = await API.get(`/users/${userId}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProducts = async ({ page }: { page: number }) => {
  try {
    const response = await API.get(`/products?page=${page}&size=10`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductInfo = async (productId: string) => {
  try {
    const response = await API.get(`/products/${productId}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
