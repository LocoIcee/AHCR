import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AdoptPage from './pages/AdoptPage';
import FosterPage from './pages/FosterPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import FundraisersPage from './pages/FundraisersPage';
import MorePage from './pages/MorePage';

function App() {
  return (
    <Router basename="/AHCanineRescue/">
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/adopt" element={<AdoptPage />} />
            <Route path="/foster" element={<FosterPage />} />
            <Route path="/get-involved" element={<GetInvolvedPage />} />
            <Route path="/fundraisers" element={<FundraisersPage />} />
            <Route path="/more" element={<MorePage />} />
          </Routes>
        </main>
        <footer className="bg-[#9c7459] text-white text-center py-4 mt-auto">
          <p>&copy; {new Date().getFullYear()} Almost Home Canine Rescue. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;