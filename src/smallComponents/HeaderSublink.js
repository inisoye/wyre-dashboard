import React from 'react';
import { Link } from 'react-router-dom';

function HeaderSublink({ linkText, url, onClick }) {
  return (
    <li className='header-sublinks-list__item'>
      <Link className='header-sublink' onClick={onClick} to={url}>
        {linkText}
      </Link>
    </li>
  );
}

export default HeaderSublink;
