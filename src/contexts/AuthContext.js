import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

// Configuración global de Axios
axios.defaults.timeout = 10000; // 10 segundos
axios.defaults.headers.common['Content-Type'] = 'application/json';
// Forzar el uso de 127.0.0.1 en lugar de localhost u otra dirección
const API_URL = 'http://127.0.0.1:5000/api/auth';
console.log('Conectando a servidor de autenticación:', API_URL);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      console.log('Intentando login en:', `${API_URL}/login`);
      const response = await axios.post(`${API_URL}/login`, credentials, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      return true;
    } catch (error) {
      console.error('Error detallado:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      
      if (error.code === 'ERR_NETWORK') {
        throw new Error('No se pudo conectar al servidor. Por favor, verifica tu conexión.');
      }
      if (error.response?.status === 401) {
        throw new Error('Credenciales inválidas');
      }
      throw new Error('Error al iniciar sesión: ' + (error.response?.data?.error || error.message));
    }
  }, []);

  useEffect(() => {
    const checkAuth = async (token) => {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/verify`);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error de autenticación:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      checkAuth(token);
    } else {
      setLoading(false);
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
