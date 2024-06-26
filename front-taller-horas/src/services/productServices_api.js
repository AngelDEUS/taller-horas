import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.6:3001';

export const createProduct = async (product) => {
  const response = await axios.post(`${API_BASE_URL}/productos/productocreate`, product);
  return response.data;
};

export const createInventoryEntry = async (inventoryEntry) => {
  const response = await axios.post(`${API_BASE_URL}/inventario/inventariocreate`, inventoryEntry);
  return response.data;
};

export const createProductEntry = async (entry) => {
  const response = await axios.post(`${API_BASE_URL}/movimientos/entrada`, entry);
  return response.data;
};
