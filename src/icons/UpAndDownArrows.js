import React from 'react';

function UpAndDownArrows() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='58'
      fill='none'
      viewBox='0 0 24 58'
    >
      <g clipPath='url(#clip0)'>
        <path
          fill='#1B934E'
          d='M14.894 23.6V11.394c0-.221.109-.258.242-.082l2.264 2.982a.909.909 0 00.643.319h4.842c.22 0 .291-.143.157-.319L12.242.132c-.133-.176-.35-.176-.485 0L.957 14.295c-.133.176-.063.319.158.319h4.842a.909.909 0 00.642-.32l2.265-2.98c.133-.177.242-.14.242.08V23.6c0 .22.179.4.4.4h4.988a.4.4 0 00.4-.4z'
        ></path>
      </g>
      <g clipPath='url(#clip1)'>
        <path
          fill='#F80404'
          d='M9.106 34.4v12.205c0 .222-.109.258-.242.082L6.6 43.705a.909.909 0 00-.643-.319H1.115c-.22 0-.291.143-.157.319l10.8 14.163c.133.176.35.176.485 0l10.8-14.163c.133-.176.063-.319-.158-.319h-4.842a.909.909 0 00-.642.32l-2.265 2.98c-.133.177-.242.14-.242-.08V34.4a.4.4 0 00-.4-.4H9.506a.4.4 0 00-.4.4z'
        ></path>
      </g>
      <defs>
        <clipPath id='clip0'>
          <path
            fill='#fff'
            d='M0 0H24V24H0z'
            transform='rotate(90 12 12)'
          ></path>
        </clipPath>
        <clipPath id='clip1'>
          <path
            fill='#fff'
            d='M0 0H24V24H0z'
            transform='rotate(-90 29 29)'
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default UpAndDownArrows;
