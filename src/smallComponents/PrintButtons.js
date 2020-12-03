import React from 'react';

import PdfIcon from '../icons/PdfIcon';
import PrintIcon from '../icons/PrintIcon';

function PrintButtons() {
  return (
    <ul className='print-buttons h-hidden-medium-down'>
      <li className='print-button-container'>
        <button className='print-button'>
          <PdfIcon />
        </button>
      </li>
      <li className='print-button-container'>
        <button className='print-button'>
          <PrintIcon />
        </button>
      </li>
    </ul>
  );
}

export default PrintButtons;
