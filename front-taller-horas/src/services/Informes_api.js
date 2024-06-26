import axios from 'axios';

const BACKEND_URL = "http://192.168.0.6:3001";

export const GET_INFORME_ENTRADAS = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/movimientos/infoentradas`);
    console.log('Respuesta de la consulta (GET_INFORME_ENTRADAS):', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching entries data (GET_INFORME_ENTRADAS):', error);
    return null;
  }
};

export const GET_INFORME_SALIDAS = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/movimientos/infosalidas`);
    console.log('Respuesta de la consulta (GET_INFORME_SALIDAS):', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching exits data (GET_INFORME_SALIDAS):', error);
    return null;
  }
};
