import React from 'react';
import { Link } from 'react-router-dom';

function HeaderLink({ linkText, url, onClick }) {
  return (
    <li className='header-nav-list__item'>
      <Link onClick={onClick} className='header-link' to={url}>
        {linkText}
      </Link>
    </li>
  );
}

export default HeaderLink;
