import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppTabs from '../src/components/tabs/MenuTabs'; // Import the AppTabs component
import UpdateStockForm from './pages/UpdateStockForm ';
import UpdateSaleForm from './pages/UpdateSaleForm ';

function App()
{
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppTabs />} />
          <Route path="/update-stock/:id" element={<UpdateStockForm />} />
          <Route path="/update-sale/:id" element={<UpdateSaleForm />} />



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
