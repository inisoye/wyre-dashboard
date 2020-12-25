import React, { useEffect, useContext } from 'react';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';
import PowerQualityPageSection from '../components/parameterPagesSections/PowerQualityPageSection';

import PrintButtons from '../smallComponents/PrintButtons';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Parameters', id: 2 },
  { url: '#', name: 'Power Quality', id: 3 },
];

function PowerQuality({ match }) {
  const { refinedRenderedData, setCurrentUrl } = useContext(
    CompleteDataContext
  );

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  const { power_quality } = refinedRenderedData;

  const powerQualitySections =
    power_quality &&
    power_quality.map((eachDevice) => (
      <PowerQualityPageSection
        key={eachDevice.deviceName}
        pqData={eachDevice}
      />
    ));

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
        <PrintButtons />
      </div>

      <div>{powerQualitySections}</div>
    </>
  );
}

export default PowerQuality;
