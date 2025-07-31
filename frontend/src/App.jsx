import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Form from './components/Form';
import Resume from './components/Resume';
import Home from './components/Home';
import './components/Resumestyle.css';

function Navbar({ dark, toggleDark }) {
  return (
    <div className="navbar">
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>ResumeCraft</h1>
      <button className="theme-toggle" onClick={toggleDark}>
        {dark ? '🌞' : '🌙'}
      </button>
    </div>
  );
}

function Layout() {
  const location = useLocation();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  const showNavbar = location.pathname !== '/'; // Hide on Home page

  return (
    <>
      {showNavbar && <Navbar dark={dark} toggleDark={() => setDark(!dark)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;

