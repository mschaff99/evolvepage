import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <nav>
        <Link to="/terms" className="mx-2">Términos</Link>
        <Link to="/privacy" className="mx-2">Privacidad</Link>
        <Link to="/contact" className="mx-2">Contacto</Link>
      </nav>
    </footer>
  );
};

export default Footer;