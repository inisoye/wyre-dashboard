import React from 'react';

import PdfIcon from '../icons/PdfIcon';
import PrintIcon from '../icons/PrintIcon';

function PrintButtons() {
  return (
    <ul className='h-hidden-medium-down'>
      <li>
        <button>
          <PdfIcon />
        </button>
      </li>
      <li>
        <button>
          <PrintIcon />
        </button>
      </li>
    </ul>
  );
}

export default PrintButtons;
