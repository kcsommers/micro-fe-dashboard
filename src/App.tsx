import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard';
import { Button } from 'kc_components/ui/Button';

import './index.scss';

const App = () => (
  <div className='flex flex-col min-h-screen'>
    <Button text='Hello' />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  </div>
);
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
