import ReportWithRate from './ReportWithRate';

import { roundToDecimalPLace } from '../../helpers/genericHelpers';

const colorSelector = {
  paprScore: { backgroundColor: '#FFECF6', color: '#FF3DA1'}
}

const MiniDoubleCard = ({ percentage, metrics, type, icon, header }) => {
  const color = colorSelector[type];
  return (
    <div className="report-row-1-card report-card-2 report-card">
      <div className="report-card-2__top">
        <div className="report-card-2__topleft">
          <ReportWithRate header={header} icon={icon}
            value={percentage.value} rate={percentage.rate}
            unit={percentage.unit} color={color} />
        </div>
        <div className="report-card-2__topright">
          <div>
            <p className="report-card-2-topright__first">
              <span className="h-block report-card-2-decr">
                Peak Value{' '}
              </span>
              <span className="h-screen-reader-text"> value is </span>
              <span className="report-card-2-topright__value">
                {
                  roundToDecimalPLace(metrics?.peak) + metrics?.units}
              </span>
            </p>

            <p className="report-card-2-topright__second">
              <span className="h-block report-card-2-decr">
                Avg Value{' '}
              </span>
              <span className="h-screen-reader-text"> value is </span>
              <span className="report-card-2-topright__value">
                {
                  roundToDecimalPLace(metrics?.average) + metrics?.units}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="report-card-2__bottom">
        <p>
          You lost approximately sample text
          <span className="report-card-2-bottom__value">
            ₦
            {/* {papr &&
            numberFormatter(total_energy_consumed.amount_lost)} */}
          </span>
        </p>
      </div>
    </div>
  )
}

export default MiniDoubleCard;
