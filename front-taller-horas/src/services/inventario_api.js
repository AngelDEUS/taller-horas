import axios from 'axios';

const API_URL = "http://192.168.0.6:3001";

export const getAllStocks = async () => {
  try {
    const response = await axios.get(`${API_URL}/inventario/getallstocks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all stocks:', error);
    throw error;
  }
};

export const getInventario = async () => {
  try {
    const response = await axios.get(`${API_URL}/inventario/getinventario_p`);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

export const createInventarioEntry = async (entry) => {
  try {
    const response = await axios.post(`${API_URL}/inventario/inventariocreate`, entry);
    return response.data;
  } catch (error) {
    console.error('Error creating inventory entry:', error);
    throw error;
  }
};

export const updateInventarioEntry = async (id, entry) => {
  try {
    const response = await axios.put(`${API_URL}/inventario/inventarioup/${id}`, entry);
    return response.data;
  } catch (error) {
    console.error(`Error updating inventory entry with id ${id}:`, error);
    throw error;
  }
};

export const deleteInventarioEntry = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/inventario/inventariodel/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting inventory entry with id ${id}:`, error);
    throw error;
  }
};
