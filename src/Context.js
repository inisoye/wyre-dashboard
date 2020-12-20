import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import dataHttpServices from './services/data';

import { getRefinedOrganizationData } from './helpers/organizationDataHelpers';
import { getRenderedData } from './helpers/renderedDataHelpers';

// create context
const CompleteDataContext = React.createContext();

// create provider
const CompleteDataProvider = (props) => {
  const [organization, setOrganization] = useState([]);
  const [renderedDataObjects, setRenderedDataObjects] = useState({});
  // Note: the rendered data objects state exludes data for the whole organisation
  const [refinedRenderedData, setRefinedRenderedData] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNavLinkDropdownOpen, setIsNavLinkDropdownOpen] = useState(false);

  const [currentUrl, setCurrentUrl] = useState('/');

  const isSmallScreen = useMediaQuery({ query: '(max-width: 544px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const isLargeScreen = useMediaQuery({ query: '(max-width: 1012px)' });
  const isXLargeScreen = useMediaQuery({ query: '(max-width: 1280px)' });
  const isLessThan1296 = useMediaQuery({ query: '(max-width: 1296px)' });

  // console.log(refinedRenderedData);

  useEffect(() => {
    const getData = () => {
      dataHttpServices
        .getAuthenticated()
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

        isNavOpen: isNavOpen,
        setIsNavOpen: setIsNavOpen,
        isSidebarOpen: isSidebarOpen,
        setIsSidebarOpen: setIsSidebarOpen,
        isNavLinkDropdownOpen: isNavLinkDropdownOpen,
        setIsNavLinkDropdownOpen: setIsNavLinkDropdownOpen,

        currentUrl: currentUrl,
        setCurrentUrl: setCurrentUrl,

        isSmallScreen: isSmallScreen,
        isMediumScreen: isMediumScreen,
        isLargeScreen: isLargeScreen,
        isXLargeScreen: isXLargeScreen,
        isLessThan1296: isLessThan1296,
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
