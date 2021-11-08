import { Rate } from 'antd';

import { roundToDecimalPLace } from '../../helpers/genericHelpers';

const colorSelector = {
  paprScore: { backgroundColor: '#FFFBE5', color: '#FFD400' }
}

const LargeDoubleCard = ({ percentage, metrics, type, icon, header }) => {
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
                {Number(percentage.value).toFixed(2) + percentage.unit}
              </p>
            </div>

            <div className="report-card-1-rating">
              <Rate
                allowHalf
                value={percentage.rate}
              />
            </div>
          </>
          <div className="report-card-1-paragraph">
            <p>
              Total Energy Consumed
              <span className="report-card-2-bottom__value">
                ₦
                {/* {papr &&
            numberFormatter(total_energy_consumed.amount_lost)} */}
              </span>
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
                  roundToDecimalPLace(metrics?.peak).toFixed(2) + metrics?.units}
              </span>
            </p>

            <p className="report-card-2-topright-large__second">
              <span className="h-block report-card-large-decr">
                Savings{' '}
              </span>
              <span className="report-card-2-topright__value">
                {
                  roundToDecimalPLace(metrics?.average).toFixed(2) + metrics?.units}
              </span>
            </p>
          </div>
          <div className="report-card-2-large__bottom">
            <p>
              Total Energy Consumed
              <span className="report-card-2-bottom__value">
                ₦
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LargeDoubleCard;
