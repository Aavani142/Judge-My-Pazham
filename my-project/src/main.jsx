import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RipenessJudge from './components/RipenessJudge';
import TypeJudge from './components/TypeJudge';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ripeness" element={<RipenessJudge />} />
        <Route path="/type" element={<TypeJudge />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
