import React, { useEffect, useState } from 'react';

import dataHttpServices from './services/data';

import { getRefinedOrganizationData } from './helpers/organizationDataHelpers';
import { getRenderedData } from './helpers/renderedDataHelpers';

// create context
const CompleteDataContext = React.createContext();

// create provider
const CompleteDataProvider = (props) => {
  const [organization, setOrganization] = useState([]);
  const [renderedDataObjects, setRenderedDataObjects] = useState({});
  const [refinedRenderedData, setRefinedRenderedData] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Note: the rendered data objects state exludes data for the whole organisation

  // console.log(renderedDataObjects);
  // console.log(refinedRenderedData);

  useEffect(() => {
    const getData = () => {
      // This should be changed to a get single later
      dataHttpServices
        .getAll()
        .then((returnedData) => {
          setOrganization(returnedData);
          const refinedOrganizationData = getRefinedOrganizationData(
            returnedData
          );

          // If nothing is checked, render organization's data
          if (
            Object.keys(checkedItems).length === 0 &&
            checkedItems.constructor === Object
          ) {
            setRefinedRenderedData(refinedOrganizationData);
          } else {
            setRenderedDataObjects(renderedDataObjects);

            const renderedDataArray = Object.values(renderedDataObjects);
            setRefinedRenderedData(getRenderedData(renderedDataArray));
          }
        })
        .catch((error) => console.log(error));
    };

    getData();
  }, [checkedItems, renderedDataObjects]);

  return (
    <CompleteDataContext.Provider
      value={{
        organization: organization,
        refinedRenderedData: refinedRenderedData,
        renderedDataObjects: renderedDataObjects,
        setRenderedDataObjects: setRenderedDataObjects,
        checkedItems: checkedItems,
        setCheckedItems: setCheckedItems,
        isSidebarOpen: isSidebarOpen,
        setIsSidebarOpen: setIsSidebarOpen,
      }}
    >
      {props.children}
    </CompleteDataContext.Provider>
  );
};

// create consumer
const CompleteDataConsumer = CompleteDataContext.Consumer;

export { CompleteDataProvider, CompleteDataConsumer };
export default CompleteDataContext;
