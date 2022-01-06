import { Rate } from 'antd';

import { roundToDecimalPLace } from '../../helpers/genericHelpers';

const colorSelector = {
  paprScore: { backgroundColor: '#FFFBE5', color: '#FFD400' }
}

const LargeDoubleCard = ({ baseLine, type, icon, header }) => {
  const color = colorSelector[type];
  const Component = icon;
  return (
    <div className="report-card-double report-card ">
      <div className="report-card-2__top report-card-2__top-margin" >
        <div className="report-card-2__topleft report-card-2__topleft-double">
          <>
            <h3 className="report-card-1-heading">{header}</h3>
            <div className='report-card-with-rate__content-wrapper' >
              <div className='report-card-with-rate__icon-wrapper'
                style={{ backgroundColor: color.backgroundColor }}>
                <Component style={{ stroke: color, fill: color.color }} className='report-card-icon' />
              </div>
              <p className="report-card-large-percentage">
                { (baseLine.forcast & baseLine.consumption ? (Number((baseLine.forcast / baseLine.consumption) * 100)).toFixed(2) : 0) + '%'}
              </p>
            </div>

            <div className="report-card-1-rating">
              <Rate
                allowHalf
                value={baseLine.rate}
              />
            </div>
          </>
          <div className="report-card-1-paragraph">
            <p>
              Forcast to rate percentage
            </p>
          </div>
        </div>
        <div className="report-card-2__topright" style={{ width: '50%', marginRight: '5%' }}>
          <div>
            <p className="report-card-2-topright__first">
              <span className="h-block report-card-large-decr">
                Forcasted Baseline{' '}
              </span>
              <span className="report-card-2-topright-large__value">
                {
                  roundToDecimalPLace(baseLine.forcast) + baseLine?.unit}
              </span>
            </p>

            <p className="report-card-2-topright-large__second">
              <span className="h-block report-card-large-decr">
                Savings{' '}
              </span>
              <span className="report-card-2-topright__value">
                {roundToDecimalPLace(baseLine.consumption) + baseLine.unit}
              </span>
            </p>
          </div>
          <div className="report-card-2-large__bottom">
            <p>
              You {(baseLine.consumption - baseLine.forcast) > 0? 'Lost': 'Gained'} Approximately{' '}
              <span className="report-card-2-bottom__value">
                ₦{(baseLine.consumption - baseLine.forcast) > 0? (baseLine.consumption - baseLine.forcast).toFixed(2) : (baseLine.forcast - baseLine.consumption).toFixed(2)  }
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LargeDoubleCard;
