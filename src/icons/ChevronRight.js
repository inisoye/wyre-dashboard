import React from 'react';

function ChevronRight({ className }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      fill='none'
      viewBox='0 0 18 18'
    >
      <path
        stroke='#646464'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeOpacity='0.7'
        strokeWidth='2'
        d='M6.75 13.5l4.5-4.5-4.5-4.5'
      ></path>
    </svg>
  );
}

export default ChevronRight;
