import React, { useContext } from 'react';
import CompleteDataContext from '../Context';

import DateTimePicker from './DateTimePicker';

function TopBar() {
  const { isSidebarOpen } = useContext(CompleteDataContext);

  return (
    <div className={isSidebarOpen ? 'top-bar' : 'top-bar h-hidden-medium-down'}>
      <DateTimePicker />
    </div>
  );
}

export default TopBar;
