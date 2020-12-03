import React from 'react';
import { Link } from 'react-router-dom';

function HeaderLink({ linkText, url }) {
  return (
    <li className='header-nav-list__item'>
      <Link className='header-link' to={url}>
        {linkText}
      </Link>
    </li>
  );
}

export default HeaderLink;
