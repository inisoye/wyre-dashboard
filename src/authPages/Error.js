import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className='error-page'>
      <div className='error-card'>
        <h1 className='error-heading'>Access Denied</h1>

        <p className='error-paragraph'>
          You are not authorised to view the page you just requested. This may
          be because you were logged out due to inactivity.
        </p>

        <Link className='error-cta' to='/log-in'>
          Login
        </Link>
      </div>
    </div>
  );
}

export default Error;
