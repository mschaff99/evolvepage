import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';

// Nuevo componente Modal
const DetalleModal = ({ isOpen, onClose, data, selectedCell }) => {
  if (!isOpen) return null;

  const formatearFecha = (fecha) => {
    try {
      if (!fecha) return '';
      const fechaObj = new Date(fecha);
      const dia = fechaObj.getDate().toString().padStart(2, '0');
      const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
      const año = fechaObj.getFullYear();
      return `${dia}/${mes}/${año}`;
    } catch (err) {
      console.error('Error al formatear fecha:', err);
      return fecha || '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Detalle del día {selectedCell?.dia?.replace('Dia_', '')} - {selectedCell?.nombre}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">N° Report</th>
                <th className="border px-4 py-2">Fecha</th>
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Modelo</th>
                <th className="border px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border px-4 py-2">{item.numero}</td>
                  <td className="border px-4 py-2">{formatearFecha(item.fecha)}</td>
                  <td className="border px-4 py-2">{item.nombre}</td>
                  <td className="border px-4 py-2">{item.modelo}</td>
                  <td className="border px-4 py-2 text-right">
                    {new Intl.NumberFormat('es-CL').format(item.valor_total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TableReport = () => {
  const [periodo, setPeriodo] = useState('202501');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detalleData, setDetalleData] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [cache, setCache] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detalleCache, setDetalleCache] = useState({});

  const fetchReportData = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Verificar caché
    const cacheKey = `report_${periodo}`;
    if (cache[cacheKey]) {
      setReportData(cache[cacheKey]);
      setLoading(false);
      return;
    }

    try {
      // Convertir periodo (YYYYMM) a fecha_inicio y fecha_fin
      const año = periodo.substring(0, 4);
      const mes = periodo.substring(4, 6);
      const fecha_inicio = `${año}-${mes}-01`;
      const ultimoDia = new Date(año, mes, 0).getDate();
      const fecha_fin = `${año}-${mes}-${ultimoDia}`;

      const response = await axios.post('http://localhost:5000/api/reports/maquinaria', {
        fecha_inicio,
        fecha_fin
      });

      console.log('Respuesta del servidor:', response.data);

      if (response.data.success) {
        // Guardar en caché
        setCache(prev => ({
          ...prev,
          [cacheKey]: response.data.data
        }));
        setReportData(response.data.data);
        if (response.data.message) {
          setError(response.data.message);
        }
      } else {
        setError(response.data.error || 'Los datos recibidos no tienen el formato esperado');
      }
    } catch (err) {
      setError('Error al cargar los datos: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [periodo, cache]);

  const handleExportExcel = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/reports/export', {
        periodo
      }, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reporte_maquinaria_${periodo}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Error al exportar: ' + err.message);
    }
  };

  const handleCellClick = async (nombre, dia) => {
    if (!dia || dia === 'Total General' || !nombre) return;
    
    try {
      // Verificar caché de detalles
      const cacheKey = `${periodo}_${nombre}_${dia}`;
      if (detalleCache[cacheKey]) {
        setDetalleData(detalleCache[cacheKey]);
        setSelectedCell({ nombre, dia });
        setIsModalOpen(true);
        return;
      }

      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/reports/detalle', {
        periodo,
        nombre_chofer: nombre,
        dia: dia.replace('Dia_', '') // Remover el prefijo 'Dia_' si existe
      });

      if (response.data.success) {
        // Guardar en caché
        setDetalleCache(prev => ({
          ...prev,
          [cacheKey]: response.data.data
        }));
        setDetalleData(response.data.data);
        setSelectedCell({ nombre, dia });
        setIsModalOpen(true);
      }
    } catch (err) {
      setError('Error al cargar el detalle: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Paginación de datos
  const paginatedData = useMemo(() => {
    if (!reportData?.data) return [];
    const start = (page - 1) * pageSize;
    return reportData.data.slice(start, start + pageSize);
  }, [reportData, page, pageSize]);

  const totalPages = useMemo(() => {
    return Math.ceil((reportData?.data?.length || 0) / pageSize);
  }, [reportData, pageSize]);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className="border p-2 rounded"
          placeholder="Período (MMAAAA)"
        />
        <button
          onClick={fetchReportData}
          className="bg-neon-purple text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Cargar Datos'}
        </button>
        {reportData && (
          <button
            onClick={handleExportExcel}
            className="bg-neon-pink text-white px-4 py-2 rounded"
          >
            Exportar a Excel
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {reportData && reportData.columns && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  {reportData.columns.map((column) => (
                    <th key={column} className="border px-4 py-2">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    {reportData.columns.map((column) => (
                      <td 
                        key={column} 
                        className={`border px-4 py-2 text-right ${
                          column.startsWith('Dia_') ? 'cursor-pointer hover:bg-gray-100' : ''
                        }`}
                        onClick={() => handleCellClick(row.nombre, column)}
                      >
                        {row[column] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Controles de paginación */}
          <div className="mt-4 flex justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="px-3 py-1">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="px-3 py-1 border rounded"
            >
              <option value={25}>25 por página</option>
              <option value={50}>50 por página</option>
              <option value={100}>100 por página</option>
            </select>
          </div>
        </>
      )}

      <DetalleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={detalleData || []}
        selectedCell={selectedCell}
      />

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-purple"></div>
        </div>
      )}
    </div>
  );
};

export default TableReport;
