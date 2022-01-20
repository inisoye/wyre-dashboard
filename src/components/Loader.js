import React from 'react';

import Logo from '../icons/Logo';
import NewLogo from '../icons/NewLogo';

function Loader() {
  return (
    <div className='loader-wrapper'>
      {/* <Logo className='loader' /> */}
      <NewLogo className='loader-new-logo' />
    </div>
  );
}

export default Loader;
