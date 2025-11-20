import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const scrollToServices = (e) => {
    e.preventDefault();
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-black text-white py-4 px-6 shadow-md">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center gap-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img 
              src="https://evolveasesores.cl/logo%20evolve_horizontal.png" 
              alt="Evolve Asesores" 
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Navegación */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-lg font-medium">
            <li><Link to="/" className="hover:text-purple-400 transition">Inicio</Link></li>
            <li><a href="#servicios" onClick={scrollToServices} className="hover:text-purple-400 transition">Servicios</a></li>
            <li><Link to="/contacto" className="hover:text-purple-400 transition">Contacto</Link></li>
            <li>
              <button className="hover:text-purple-400 transition cursor-not-allowed opacity-70" 
                     title="Próximamente disponible">
                Login
              </button>
            </li>
          </ul>
        </nav>

        {/* Menú móvil - hamburguesa */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
