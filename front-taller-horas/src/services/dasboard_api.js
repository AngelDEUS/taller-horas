import axios from 'axios';

const BACKEND_URL = "http://192.168.0.6:3001";

export const GET_PRODUCTOS_REGISTRADOS = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/productos/dashboard1`);
    console.log('Respuesta de la consulta (GET_PRODUCTOS_REGISTRADOS):', response);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching dashboard data (GET_PRODUCTOS_REGISTRADOS):', error);
    return null;
  }
};

export const GET_STOCKS_EXISTENTES = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/productos/dashboard2`);
    console.log('Respuesta de la consulta (GET_STOCKS_EXISTENTES):', response);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching dashboard data (GET_STOCKS_EXISTENTES):', error);
    return null;
  }
};

export const GET_PRODUCTOS_STOCK_BAJO = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/productos/dashboard3`);
    console.log('Respuesta de la consulta (GET_PRODUCTOS_STOCK_BAJO):', response);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching dashboard data (GET_PRODUCTOS_STOCK_BAJO):', error);
    return null;
  }
};

export const GET_PRODUCTOS_SIN_STOCK = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/productos/dashboard4`);
    console.log('Respuesta de la consulta (GET_PRODUCTOS_SIN_STOCK):', response);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching dashboard data (GET_PRODUCTOS_SIN_STOCK):', error);
    return null;
  }
};
