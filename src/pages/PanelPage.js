import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropuestaIVA from '../components/PropuestaIVA';
import TableReport from '../components/TableReport';

const PanelPage = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const powerBiUrl = "https://app.powerbi.com/view?r=eyJrIjoiNjkxYTY1OTMtZTViMi00YTMzLWFkN2EtOTgxODI4MWFmYmM3IiwidCI6ImNjNzJiN2EwLTY5ZTItNDhmYi1iYjZjLTc0ZGQ3MTJlODZiMyIsImMiOjR9";

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-neon-purple">Evolve</h2>
        </div>
        <nav className="mt-6">
          <button 
            onClick={() => setCurrentView('dashboard')} 
            className={`block w-full text-left py-2 px-4 hover:bg-neon-purple transition-colors ${
              currentView === 'dashboard' ? 'bg-neon-purple' : ''
            }`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setCurrentView('table')}
            className={`block w-full text-left py-2 px-4 hover:bg-neon-purple transition-colors ${
              currentView === 'table' ? 'bg-neon-purple' : ''
            }`}
          >
            Tabla Report
          </button>
          <button 
            onClick={() => setCurrentView('iva')}
            className={`block w-full text-left py-2 px-4 hover:bg-neon-purple transition-colors ${
              currentView === 'iva' ? 'bg-neon-purple' : ''
            }`}
          >
            Propuesta IVA
          </button>
          <Link to="/profile" className="block py-2 px-4 hover:bg-neon-purple transition-colors">
            Perfil
          </Link>
          <Link to="/settings" className="block py-2 px-4 hover:bg-neon-purple transition-colors">
            Configuración
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">
              {currentView === 'dashboard' ? 'Dashboard' : 
               currentView === 'table' ? 'Tabla Report' : 'Propuesta IVA'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="bg-neon-pink text-white px-4 py-2 rounded-md">
                Notificaciones
              </button>
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-hidden">
          {currentView === 'dashboard' && (
            <div className="w-full bg-white rounded-lg overflow-hidden" style={{ height: 'calc(100vh - 100px)' }}>
              <iframe
                title="Power BI Dashboard"
                width="100%"
                height="100%"
                src={powerBiUrl}
                frameBorder="0"
                allowFullScreen
                style={{ height: '100%', minHeight: 'calc(100vh - 100px)' }}
              />
            </div>
          )}
          {currentView === 'table' && <TableReport />}
          {currentView === 'iva' && <PropuestaIVA />}
        </main>
      </div>
    </div>
  );
};

export default PanelPage;