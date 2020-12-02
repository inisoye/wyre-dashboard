import React from 'react';

function MessageIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='20'
      fill='none'
      viewBox='0 0 24 20'
    >
      <path
        fill='#C4C4C4'
        d='M21.89.86H2.11C.947.86 0 1.805 0 2.968V17.03c0 1.159.944 2.11 2.11 2.11h19.78c1.16 0 2.11-.944 2.11-2.11V2.97c0-1.159-.944-2.11-2.11-2.11zm-.29 1.406l-9.555 9.554-9.638-9.554H21.6zM1.405 16.74V3.253L8.18 9.968 1.406 16.74zm.995.994l6.776-6.776 2.375 2.354a.703.703 0 00.992-.002l2.315-2.316 6.74 6.74H2.401zm20.193-.994L15.854 10l6.74-6.74v13.48z'
      ></path>
    </svg>
  );
}

export default MessageIcon;
