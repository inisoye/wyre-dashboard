import React, { useContext } from 'react';
import CompleteDataContext from './Context';

import MainAppPages from './pageSwitchers/MainAppPages';
import AuthPages from './pageSwitchers/AuthPages';
import AdminPages from './pageSwitchers/AdminPages';

function App() {
  const { userData, isUserAdmin, isAuthenticatedDataLoading } = useContext(CompleteDataContext);

  return (
    <>
      {isUserAdmin ? (
        <AdminPages />
      ) : userData ? (
        <MainAppPages 
        isLoading={isAuthenticatedDataLoading} />
      ) : (
        <AuthPages />
      )}
    </>
  );
}

export default App;
