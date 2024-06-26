import axios from 'axios';

const API_URL = "http://192.168.0.6:3001";

export const registerSalidaProducto = async (salidaData) => {
  try {
    const response = await axios.post(`${API_URL}/movimientos/salida`, salidaData);
    return response.data;
  } catch (error) {
    console.error('Error registering product salida:', error);
    throw error;
  }
};