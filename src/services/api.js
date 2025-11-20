import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const api = {
  calcularIVA: async (periodo) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/calcular-iva`, { periodo });
      return response.data;
    } catch (error) {
      console.error('Error en API:', error);
      throw error;
    }
  }
};

export default api;
