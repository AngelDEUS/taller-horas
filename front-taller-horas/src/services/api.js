import axios from 'axios';

const BACKEND_URL = "http://192.168.0.6:3001";

export const getDashboardMayorStock = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/productos/dashboardmayorstock`);
    console.log('Consulta exitosa productos con mayor stock.', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return null;
  }
};
