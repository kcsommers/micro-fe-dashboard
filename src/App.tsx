import React from 'react';
import 'kc_components/global-styles';
import { BaseTheme } from 'kc_components/theme';
import { Layout } from 'kc_components/ui/Layout';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import { DashboardPage } from './pages/dashboard';

const App = () => (
  <BaseTheme>
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  </BaseTheme>
);
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
