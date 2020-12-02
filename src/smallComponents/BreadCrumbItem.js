import React from 'react';
import { Link } from 'react-router-dom';

import ChevronRight from '../icons/ChevronRight';

function BreadCrumbItem({ linkUrl, linkName }) {
  return (
    <li className='breadcrumb-item'>
      <Link className='breadcrumb-link' to={linkUrl}>
        <ChevronRight className='breadcrumb-icon' />
        <span className='breadcrumb-text'>{linkName}</span>
      </Link>
    </li>
  );
}

export default BreadCrumbItem;
