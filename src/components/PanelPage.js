import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IAPredictor from './IAPredictor'; // Importar el componente IAPredictor

const PanelPage = () => {
  const [currentSection, setCurrentSection] = useState('panel');
  const powerBiUrl = "https://app.powerbi.com/view?r=eyJrIjoiNjkxYTY1OTMtZTViMi00YTMzLWFkN2EtOTgxODI4MWFmYmM3IiwidCI6ImNjNzJiN2EwLTY5ZTItNDhmYi1iYjZjLTc0ZGQ3MTJlODZiMyIsImMiOjR9";

  const renderContent = () => {
    switch(currentSection) {
      case 'dashboard':
        return (
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
        );
      case 'ia':
        return <IAPredictor />;
      default:
        // ...existing code for panel content...
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-neon-purple">Evolve</h2>
        </div>
        <nav className="mt-6">
          <button 
            onClick={() => setCurrentSection('panel')}
            className={`block w-full text-left py-2 px-4 hover:bg-neon-purple transition-colors ${
              currentSection === 'panel' ? 'bg-neon-purple text-black' : ''
            }`}
          >
            Panel General
          </button>
          <button 
            onClick={() => setCurrentSection('dashboard')}
            className={`block w-full text-left py-2 px-4 hover:bg-neon-purple transition-colors ${
              currentSection === 'dashboard' ? 'bg-neon-purple text-black' : ''
            }`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setCurrentSection('applications')}
            className={`block w-full text-left py-2 px-4 hover:bg-neon-purple transition-colors ${
              currentSection === 'applications' ? 'bg-neon-purple text-black' : ''
            }`}
          >
            Aplicaciones IA
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
        <header className="bg-white shadow-md p-4 relative z-50">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold flex-1">
              {currentSection === 'dashboard' ? 'Dashboard Power BI' : 
               currentSection === 'applications' ? 'Aplicación IA' : 'Panel de Control'}
            </h1>
            <div className="flex items-center gap-4 z-50">
              <button className="bg-neon-pink text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors">
                Notificaciones
              </button>
              <div className="w-10 h-10 bg-gray-300 rounded-full shrink-0"></div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default PanelPage;
