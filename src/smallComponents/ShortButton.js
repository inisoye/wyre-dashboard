import React from 'react';

function ShortButton({ buttonText, onClickAction, passedClassName }) {
  return (
    <>
      <button
        className={`short-button ${passedClassName}`}
        onClick={onClickAction}
      >
        {buttonText}
      </button>
    </>
  );
}

export default ShortButton;
