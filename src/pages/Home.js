import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Aurora from '../components/Aurora';
import SplitText from '../components/SplitText';
// Importar la imagen
import dashboardImage from '../assets/images/dashboard.jpg';

const Home = () => {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  const scrollToServices = () => {
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <section className="hero-section bg-neon-purple bg-opacity-10 py-10 md:py-20 relative min-h-[500px] md:h-screen overflow-hidden">
        <Aurora colorStops={["#D400FF", "#EB0A64", "#00D8FF"]} speed={0.5} />
        <div className="container mx-auto text-center px-4 relative z-10 pt-10 md:pt-0">
          <SplitText
            text="Evolve Asesores"
            className="text-5xl md:text-7xl font-bold mb-4"
            delay={50}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={handleAnimationComplete}
          />
          <p className="text-lg md:text-xl mb-8">Soluciones tecnológicas a medida para tu negocio.</p>
          <button 
            onClick={scrollToServices}
            className="bg-neon-purple text-black px-6 py-2 rounded-lg hover:bg-neon-pink"
          >
            Ver más
          </button>
        </div>
      </section>
      
      {/* Sección de servicios */}
      <section id="servicios" className="services-section py-16 md:py-20 relative bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2">
              <SplitText
                text="CONSULTORÍA EN BUSINESS INTELLIGENCE"
                className="text-3xl md:text-4xl font-bold mb-6 text-neon-pink"
                delay={30}
                animationFrom={{ opacity: 0, transform: 'translate3d(-50px,0,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutQuart"
                threshold={0.1}
                rootMargin="0px"
              />
              <p className="text-base md:text-lg mb-6 opacity-0 animate-fadeIn" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
                En EVOLVE nos especializamos en transformar datos en conocimiento accionable mediante soluciones avanzadas de Business Intelligence.
                Desarrollamos sistemas confiables y rápidos que potencian la toma de decisiones estratégicas a través de dashboards interactivos y análisis predictivo.
              </p>
              <p className="text-base md:text-lg mb-6 opacity-0 animate-fadeIn" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
                Implementamos procesos ETL optimizados y aplicamos tecnologías de inteligencia artificial para extraer el máximo valor de sus datos,
                manteniendo siempre un enfoque de mejora continua e innovación constante.
              </p>
              <ul className="list-disc list-inside mb-6 space-y-2 opacity-0 animate-fadeIn" style={{animationDelay: '0.7s', animationFillMode: 'forwards'}}>
                <li>Desarrollo de dashboards interactivos</li>
                <li>Automatización de procesos empresariales</li>
                <li>Soluciones de inteligencia artificial aplicada</li>
                <li>Procesamiento ETL optimizado</li>
              </ul>
              <button className="bg-neon-purple text-black px-6 py-2 rounded-lg hover:bg-neon-pink opacity-0 animate-fadeIn" 
                      style={{animationDelay: '0.9s', animationFillMode: 'forwards'}}>
                Conocer más
              </button>
            </div>
            <div className="w-full md:w-1/2 opacity-0 animate-fadeIn mt-8 md:mt-0" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
              <div className="rounded-lg overflow-hidden shadow-2xl shadow-neon-purple/20 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={dashboardImage} 
                  alt="Dashboard de Business Intelligence" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;