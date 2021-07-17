import React from 'react';
import { numberFormatter } from '../helpers/numberFormatter';
import avatar from '../images/tower.png';

function DashBoardAmountUsed({ timeInUse, name, amount, totalKWH}) {
    return (
        <>
        <div className="total-right-energy-price" >
            <img style={{ height: 60
            }} src={avatar} alt='' />
        </div>
        <div className="total-left-energy-price">
            <div className="total-energy-price__heading">
                <p className="total-energy-price__heading__text">{name}</p>
            </div>
            <div>
                <p className="total-energy-price__heading__text__bold">₦ {numberFormatter(amount) || 0}</p>
                <p className="total-energy-price__heading__text">{numberFormatter(totalKWH) || 0}KWh</p>
                <p className="total-energy-price__heading__text__hrs" >{timeInUse || 0}hrs</p>
            </div>
        </div>
        </>
    );
}

export default DashBoardAmountUsed;
