import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import dataHttpServices from './services/devices';

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
  const [checkedBranches, setCheckedBranches] = useState({});
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [currentUrl, setCurrentUrl] = useState('/');
  const [powerQualityUnit, setPowerQualityUnit] = useState('Current (Amps)');

  const [isUserAdmin, setIsUserAdmin] = useState(true);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 544px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const isLargeScreen = useMediaQuery({ query: '(max-width: 1012px)' });
  const isXLargeScreen = useMediaQuery({ query: '(max-width: 1280px)' });
  const isLessThan1296 = useMediaQuery({ query: '(max-width: 1296px)' });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(undefined);
  const [token, setToken] = useState();

  // console.log(userData);
  // console.log(token);

  useEffect(() => {
    const getData = () => {
      dataHttpServices
        .getAllData()
        .then((returnedData) => {
          setOrganization(returnedData);
          const refinedOrganizationData = getRefinedOrganizationData(
            returnedData
          );

          // If nothing is checked, render organization's data
          // Otherwise, render data from checked items
          if (
            Object.keys(checkedItems).length === 0 &&
            checkedItems.constructor === Object
          ) {
            setRefinedRenderedData(refinedOrganizationData);
          } else {
            const renderedDataArray = Object.values(renderedDataObjects);
            setRefinedRenderedData(getRenderedData(renderedDataArray));
          }
        })
        .catch((error) => console.log(error));
    };

    if (userData) {
      getData();
    }
  }, [checkedItems, renderedDataObjects, userData]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedWyreUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dataHttpServices.setToken(user.data.token);
      setUserData(user);
    }
  }, []);

  return (
    <CompleteDataContext.Provider
      value={{
        organization: organization,
        refinedRenderedData: refinedRenderedData,
        renderedDataObjects: renderedDataObjects,
        setRenderedDataObjects: setRenderedDataObjects,
        checkedItems: checkedItems,
        setCheckedItems: setCheckedItems,
        checkedBranches: checkedBranches,
        setCheckedBranches: setCheckedBranches,
        numberOfCheckedItems: Object.keys(checkedItems).length,
        numberOfCheckedBranches: Object.keys(checkedBranches).length,

        isNavOpen: isNavOpen,
        setIsNavOpen: setIsNavOpen,
        isSidebarOpen: isSidebarOpen,
        setIsSidebarOpen: setIsSidebarOpen,

        currentUrl: currentUrl,
        setCurrentUrl: setCurrentUrl,
        powerQualityUnit: powerQualityUnit,
        setPowerQualityUnit: setPowerQualityUnit,

        isUserAdmin: isUserAdmin,
        setIsUserAdmin: setIsUserAdmin,

        isSmallScreen: isSmallScreen,
        isMediumScreen: isMediumScreen,
        isLargeScreen: isLargeScreen,
        isXLargeScreen: isXLargeScreen,
        isLessThan1296: isLessThan1296,

        username: username,
        setUsername: setUsername,
        password: password,
        setPassword: setPassword,
        userData: userData,
        setUserData: setUserData,
        token: token,
        setToken: setToken,
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
