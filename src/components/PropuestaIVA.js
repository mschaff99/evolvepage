import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropuestaIVA = () => {
  const [datos, setDatos] = useState([]);
  const [periodo, setPeriodo] = useState('202412');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log('Estado actual de datos:', datos);
  }, [datos]);

  const formatNumber = (value) => {
    if (value === null) return '-';
    return new Intl.NumberFormat('es-CL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const calcularIVA = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    
    const url = `${process.env.REACT_APP_API_URL}/calcular-iva`;
    console.log('URL de la API:', url);
    
    try {
      const response = await axios.post(url, 
        { periodo },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 5000
        }
      );
      
      console.log('Respuesta:', response.data);
      
      if (response.data.error) {
        console.error('Error del servidor:', response.data.error);
        setErrorMessage(`Error del servidor: ${response.data.error}`);
      } else if (response.data && response.data.rows) {
        setDatos(response.data.rows);
      } else {
        setErrorMessage('Respuesta del servidor en formato incorrecto');
      }
    } catch (error) {
      console.error('Error completo:', error);
      setErrorMessage(`Error de conexión: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const empresas = datos.length > 0 ? Object.keys(datos[0]).filter(key => key !== 'nombre_impuesto_tipo') : [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className="border p-2 rounded"
          placeholder="Período (AAAAMM)"
        />
        <button
          onClick={calcularIVA}
          className="bg-neon-purple text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Calculando...' : 'Calcular IVA'}
        </button>
      </div>

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      {isLoading && (
        <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded">
          Cargando datos...
        </div>
      )}

      {/* Debug info */}
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p>Estado de los datos: {datos.length > 0 ? 'Con datos' : 'Sin datos'}</p>
        <p>Cantidad de registros: {datos.length}</p>
      </div>

      {datos.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border">Tipo</th>
                {empresas.map((empresa) => (
                  <th key={empresa} className="px-4 py-2 text-right border">
                    {empresa}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datos.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-2 border font-medium">
                    {row.nombre_impuesto_tipo}
                  </td>
                  {empresas.map((empresa) => (
                    <td key={empresa} className="px-4 py-2 text-right border">
                      {formatNumber(row[empresa])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PropuestaIVA;
