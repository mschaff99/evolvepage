import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Aurora from '../components/Aurora';
import QRCodeStyling from 'qr-code-styling';

const Contact = () => {
  const qrContainerRef = useRef(null);
  
  useEffect(() => {
    if (qrContainerRef.current) {
      // Crear el código QR
      const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        data: "https://wa.me/56995899990",
        dotsOptions: {
          color: "#25D366", // Color de WhatsApp
          type: "rounded"
        },
        backgroundOptions: {
          color: "#ffffff"
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10
        }
      });
      
      // Limpiar el contenedor antes de añadir el QR
      qrContainerRef.current.innerHTML = '';
      
      // Añadir el QR al contenedor
      qrCode.append(qrContainerRef.current);
    }
  }, []);
  
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      
      <section className="py-16 md:py-20 relative bg-black">
        <Aurora colorStops={["#25D366", "#EB0A64", "#00D8FF"]} speed={0.3} />
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center">Contacto</h1>
          
          <div className="max-w-3xl mx-auto bg-black bg-opacity-80 p-8 rounded-xl shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              {/* Información de contacto */}
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-semibold mb-6">Escríbenos</h2>
                <p className="mb-6">
                  Estamos aquí para responder tus preguntas y ayudarte con nuestros servicios. 
                  Puedes contactarnos a través de WhatsApp escaneando el código QR.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+56 9 9589 9990</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>contacto@evolveasesores.cl</span>
                  </div>
                </div>
              </div>
              
              {/* QR Code */}
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <div ref={qrContainerRef} className="w-[300px] h-[300px] mx-auto"></div>
                </div>
                <p className="mt-6 text-center text-lg font-medium">Escanea para contactarnos por WhatsApp</p>
              </div>
            </div>
            
            {/* Servicios */}
            <div className="mt-16">
              <h3 className="text-2xl font-semibold mb-6 text-center">Nuestros Servicios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <span className="text-neon-pink font-medium">CONTABILIDAD</span>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <span className="text-neon-pink font-medium">GESTIÓN</span>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <span className="text-neon-pink font-medium">IMPUESTOS</span>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <span className="text-neon-pink font-medium">BUSINESS INTELLIGENCE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;