import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AdoptPage from './pages/AdoptPage';
import FosterPage from './pages/FosterPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import FundraisersPage from './pages/FundraisersPage';
import ContactPage from './pages/ContactPage';
import HappyTailsPage from './pages/HappyTailsPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router basename="/AHCR/">
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/adopt" element={<AdoptPage />} />
            <Route path="/foster" element={<FosterPage />} />
            <Route path="/get-involved" element={<GetInvolvedPage />} />
            <Route path="/fundraisers" element={<FundraisersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/happytails" element={<HappyTailsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<p className="text-center mt-20">Unauthorized access.</p>} /> 
          </Routes>
        </main>
          <Footer/>
      </div>
    </Router>
  );
}

export default App;