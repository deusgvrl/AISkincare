import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './Homepage';
import ScanPage from './Scanpage';
import FormPage from './FormPage'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/form" element={<FormPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
