import React, { useContext } from 'react';
import CompleteDataContext from './Context';

import MainAppPages from './pageSwitchers/MainAppPages';
import AuthPages from './pageSwitchers/AuthPages';

function App() {
  const { isUserAuthenticated } = useContext(CompleteDataContext);

  return (
    <>
      {isUserAuthenticated ? <MainAppPages /> : <AuthPages />}
    </>
  );
}

export default App;
