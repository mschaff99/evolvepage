import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import LoginPage from './pages/LoginPage'; // Comentado porque no se usará por ahora
import PanelPage from './pages/PanelPage';
import Contact from './pages/Contact';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/InciarSesion" element={<LoginPage />} /> */}
          <Route path="/contacto" element={<Contact />} />
          <Route 
            path="/panel" 
            element={
              <ProtectedRoute>
                <PanelPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;