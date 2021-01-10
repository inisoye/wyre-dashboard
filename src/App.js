import React, { useContext } from 'react';
import CompleteDataContext from './Context';

import MainAppPages from './pageSwitchers/MainAppPages';
import AuthPages from './pageSwitchers/AuthPages';

function App() {
  const { userData } = useContext(CompleteDataContext);

  return <>{userData ? <MainAppPages /> : <AuthPages />}</>;
}

export default App;
