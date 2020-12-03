import React, { useContext } from 'react';
import CompleteDataContext from '../Context';

import DateTimePicker from '../smallComponents/DateTimePicker';
import ShortButton from '../smallComponents/ShortButton';

function TopBar() {
  const { isSidebarOpen } = useContext(CompleteDataContext);

  return (
    <div className={isSidebarOpen ? 'top-bar' : 'top-bar h-hidden-medium-down'}>
      <DateTimePicker />
      <ShortButton
        passedClassName='short-button--purple top-bar-short-button'
        buttonText='Days'
      />
    </div>
  );
}

export default TopBar;
