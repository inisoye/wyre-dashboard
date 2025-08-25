import React, { useEffect, useContext } from 'react';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';
import LastReadingPageSection from '../components/parameterPagesSections/LastReadingPageSection';
import Loader from '../components/Loader';


const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Parameters', id: 2 },
  { url: '#', name: 'Last Reading', id: 3 },
];

function LastReading({ match }) {
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

  const { last_reading } = refinedRenderedData;

  const lastReadingSections =
    last_reading &&
    last_reading.map((eachDevice) => (
      <LastReadingPageSection key={eachDevice.deviceName} lrData={eachDevice} />
    ));
  
   if (isAuthenticatedDataLoading) {
     return <Loader />;
   }

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>

      {lastReadingSections}
    </>
  );
}

export default LastReading;
