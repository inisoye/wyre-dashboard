import React from 'react';
import LatestLogo from '../icons/LatestLogo';

import Logo from '../icons/Logo';
import NewLogo from '../icons/NewLogo';
// import LatestLogo from '../icons/NewLogo';



function Loader() {
  return (
    <div className='loader-wrapper'>
      {/* <Logo className='loader' /> */}
      <LatestLogo className='loader-new-logo' />
    </div>
  );
}

export default Loader;
