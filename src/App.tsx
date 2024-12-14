import React from 'react';
import Home from './pages/Home';
import Generate from './pages/Generate';
import Scan from './pages/Scan';
import History from './pages/History';
import Account from './pages/Account';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App: React.FC = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/generate" element={<Generate />}></Route> 
            <Route path="/scan" element={<Scan />} />
            <Route path="/history" element={<History />} />
            <Route path="/account" element={<Account />} />
        </Routes>
    </Router>
  );
};

export default App;
