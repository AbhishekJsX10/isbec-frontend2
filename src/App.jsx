import React, { useEffect, useState } from 'react'
import Home from './Pages/Home'
import Services from './Pages/Services'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/toast.css';
import Header from './components/Header'
import Footer from './components/Footer'
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Loader from './components/Loader';
import PhoneModal from './components/PhoneModal';
import BookDemoModal from './components/BookDemoModal'; 

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
    });

    return () => {
      scroll.destroy();
    }
  }, []);

  return (
    <>
      {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      
      {/* Modals - Rendered at root level */}
      {!isLoading && (
        <>
          <PhoneModal 
            isOpen={isPhoneModalOpen} 
            onClose={() => setIsPhoneModalOpen(false)} 
          />
          <BookDemoModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
        </>
      )}

      {/* Main Content */}
      {!isLoading && (
        <Router>
          <div className="relative">
            <Header onPhoneClick={() => setIsPhoneModalOpen(true)} setIsModalOpen={setIsModalOpen} />
            <main data-scroll-container className="relative">
              <Routes>
                <Route path="/" element={<Home setIsModalOpen={setIsModalOpen} />} />
                <Route path="/services" element={<Services setIsModalOpen={setIsModalOpen} />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer setIsModalOpen={setIsModalOpen} />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              toastClassName="!bg-black !text-white !rounded-lg !font-normal !shadow-lg !border !border-white/10"
              progressClassName="!bg-white"
              closeButton={({ closeToast }) => (
                <button 
                  onClick={closeToast}
                  className="!text-white/70 hover:!text-white/90 !p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            />
          </div>
        </Router>
      )}
    </>
  )
}

export default App