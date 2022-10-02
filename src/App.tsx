import React from 'react';
import 'kc_components/global-styles';
import { BaseTheme } from 'kc_components/theme';
import { Button } from 'kc_components/ui/Button';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import { DashboardPage } from './pages/dashboard';

const App = () => (
  <BaseTheme>
    <div className='flex flex-column min-h-screen'>
      <div>
        <Button text='Hello' />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  </BaseTheme>
);
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
