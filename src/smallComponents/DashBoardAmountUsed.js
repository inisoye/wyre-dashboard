import React from 'react';
import { numberFormatter } from '../helpers/numberFormatter';
import DeviceTypeIconSelector from './DeviceTypeIconSelector';


function DashBoardAmountUsed (
    { timeInUse,
    name, amount,
    totalKWH, deviceType 
}){

    let Component = DeviceTypeIconSelector(deviceType);

    return (
        <>
            <div className="total-energy-price__heading">
                <p className="total-energy-price__heading__text">{name}</p>
            </div>
            <hr className="total-energy-price__hr" />
            <div className="total-amount-energy-price__body">
                <div className="total-left-energy-price total-energy-price__common" >
                    <Component className="power-icon__image" />
                </div>
                <div className="total-right-energy-price total-energy-price__common">
                    <p className="total-energy-price__kwh__text">{numberFormatter(totalKWH) || 0}KWh</p>
                    <p className="total-energy-price__heading__text__hrs" >{timeInUse || 0}hrs</p>
                </div>
            </div>
            <div className="total-energy-price__footer total-energy-price__common">
                <p className="total-energy-price__footer__text"> {numberFormatter(amount)? `₦ ${numberFormatter(amount)}` : '-'}</p>
            </div>
        </>
    );
}

export default DashBoardAmountUsed;
