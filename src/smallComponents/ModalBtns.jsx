import React from 'react'

export const ModalBtns = ({ action, onClick, onMouseOver}) => {
    const BtnStyle = {
      width: '80px',
      height: '34px',
      background: '#5616F5',
      borderRadius: '8px',
      marginRight: '20px',

    //For the text in the btn
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '12px',
      lineHeight: '15px',
      color: '#FFFFFF',
    };
    return (
        <button onClick={onClick} style={BtnStyle} onMouseOver={onMouseOver}>
            {action}
        </button>
    )
}
