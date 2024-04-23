import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TaxesList from '../components/TaxesList';

function Taxes() {
  return (
    <>
      <Outlet />
      <main>
        <TaxesList />
      </main>
    </>
  );
}

export default Taxes;
