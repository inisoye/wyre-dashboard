import ReportWithRate from './ReportWithRate'

const colorSelector = {
  periodScore: { backgroundColor: '#FFE6E6', color: '#5616F5' },
  CO2Score: { backgroundColor: '#E7F4ED', color: '#7BAC50' },
  energyConsumptionScore: { backgroundColor: '#E5F9FC', color: '#00C7E6' },
}

const RecordCard = ({ header, type, icon, value, rate, unit, footer }) => {
  const color = colorSelector[type]
  return (<div className="report-row-1-card report-card-1 report-card">
    <ReportWithRate header={header} icon={icon}
      value={value} rate={rate}
      unit={unit} color={color} />
    <p className="report-card-1-paragraph">
      {footer}
      {type === 'CO2Score' &&
        <p className='co2-footprint-footer-extra'>
          Equivalent to {value * 6} large Acacia trees
        </p>
      }
    </p>
  </div>
  )
}

export default RecordCard;
