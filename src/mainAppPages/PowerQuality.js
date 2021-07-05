import React, { useEffect, useContext } from 'react';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';
import PowerQualityPageSection from '../components/parameterPagesSections/PowerQualityPageSection';
import Loader from '../components/Loader';


const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Parameters', id: 2 },
  { url: '#', name: 'Power Quality', id: 3 },
];

function PowerQuality({ match }) {
  const {
    refinedRenderedData,
    setCurrentUrl,
    isAuthenticatedDataLoading,
  } = useContext(CompleteDataContext);

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
  
   if (isAuthenticatedDataLoading) {
     return <Loader />;
   }

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>

      <div>{powerQualitySections}</div>
    </>
  );
}

export default PowerQuality;
