import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import HomePage from './Homepage';
import ScanPage from './Scanpage';
import FormPage from './FormPage';
import ResultPage from './ResultPage';

const PageAnimations = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait' onExitComplete={() => console.log('Exit animations completed')}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div exit={{ opacity: 0, y: 20 }}>
            <HomePage />
          </motion.div>
        } />
        <Route path="/scan" element={
          <motion.div exit={{ opacity: 0, y: 20 }}>
            <ScanPage />
          </motion.div>
        } />
        <Route path="/form" element={
          <motion.div exit={{ opacity: 0, y: 20 }}>
            <FormPage />
          </motion.div>
        } />
        <Route path="/result" element={
          <motion.div exit={{ opacity: 0, y: 20 }}>
            <ResultPage />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};


function App() {
  return (
    <Router>
      <Navbar />
      <PageAnimations />
    </Router>
  );
}

export default App;
