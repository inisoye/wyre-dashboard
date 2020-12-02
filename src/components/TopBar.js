import React from 'react';

import DateTimePicker from '../smallComponents/DateTimePicker';
import ShortButton from '../smallComponents/ShortButton';

function TopBar() {
  return (
    <div className='top-bar'>
      <DateTimePicker />
      <ShortButton passedClassName='short-button--purple top-bar-short-button' buttonText='Days' />
    </div>
  );
}

export default TopBar;
