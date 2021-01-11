import React, { useContext } from 'react';
import CompleteDataContext from './Context';

import MainAppPages from './pageSwitchers/MainAppPages';
import AuthPages from './pageSwitchers/AuthPages';
import AdminPages from './pageSwitchers/AdminPages';

function App() {
  const { userData, isUserAdmin } = useContext(CompleteDataContext);

  return (
    <>
      {isUserAdmin ? (
        <AdminPages />
      ) : userData ? (
        <MainAppPages />
      ) : (
        <AuthPages />
      )}
    </>
  );
}

export default App;
