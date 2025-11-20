import React, { useState } from 'react';
import IAPredictor from './IAPredictor'; // Nuevo componente para la IA

const PanelEmpresas = () => {
  const [currentView, setCurrentView] = useState('projects');
  const powerBiUrl = "https://app.powerbi.com/view?r=eyJrIjoiNjkxYTY1OTMtZTViMi00YTMzLWFkN2EtOTgxODI4MWFmYmM3IiwidCI6ImNjNzJiN2EwLTY5ZTItNDhmYi1iYjZjLTc0ZGQ3MTJlODZiMyIsImMiOjR9";

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard':
        return (
          <div className="w-full h-[800px] bg-white rounded-lg overflow-hidden">
            <iframe
              title="Power BI Dashboard"
              width="100%"
              height="100%"
              src={powerBiUrl}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        );
      case 'applications':
        return <IAPredictor />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neon-purple bg-opacity-10 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Proyectos Asignados</h2>
              <ul>
                <li>Proyecto 1</li>
                <li>Proyecto 2</li>
              </ul>
            </div>
            <div className="bg-neon-purple bg-opacity-10 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Agregar Nuevo Proyecto</h2>
              <button className="bg-neon-purple text-black px-4 py-2 rounded hover:bg-neon-pink">
                Agregar
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Bienvenido, Empresa</h1>
      
      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setCurrentView('projects')}
          className={`px-4 py-2 rounded ${currentView === 'projects' ? 'bg-neon-purple text-black' : 'bg-gray-700'}`}
        >
          Proyectos
        </button>
        <button 
          onClick={() => setCurrentView('dashboard')}
          className={`px-4 py-2 rounded ${currentView === 'dashboard' ? 'bg-neon-purple text-black' : 'bg-gray-700'}`}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setCurrentView('applications')}
          className={`px-4 py-2 rounded ${currentView === 'applications' ? 'bg-neon-purple text-black' : 'bg-gray-700'}`}
        >
          Aplicaciones
        </button>
      </div>

      {renderContent()}

      <button className="mt-8 bg-neon-purple text-black px-4 py-2 rounded hover:bg-neon-pink">
        Cerrar Sesión
      </button>
    </div>
  );
};

export default PanelEmpresas;