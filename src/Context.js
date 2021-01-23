import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import dataHttpServices from "./services/devices";

import { getRefinedOrganizationData } from "./helpers/organizationDataHelpers";
import { getRenderedData } from "./helpers/renderedDataHelpers";

// create context
const CompleteDataContext = React.createContext();

// create provider
const CompleteDataProvider = (props) => {
  const [organization, setOrganization] = useState({});
  const [renderedDataObjects, setRenderedDataObjects] = useState({});
  // Note: the rendered data objects state exludes data for the whole organisation
  const [refinedRenderedData, setRefinedRenderedData] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedBranches, setCheckedBranches] = useState({});
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticatedDataLoading, setIsAuthenticatedDataLoading] = useState(
    true
  );

  const [currentUrl, setCurrentUrl] = useState("/");
  const [powerQualityUnit, setPowerQualityUnit] = useState("Current (Amps)");
  /*
   ** For main app-wide datetime-picker.
   ** New requests fired when datetime range is changed.
   */
  const [userDateRange, setUserDateRange] = useState([]);
  const [parametersDataTimeInterval, setParametersDataTimeInterval] = useState(
    ""
  );

  const [isUserAdmin, setIsUserAdmin] = useState(false);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 544px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const isLargeScreen = useMediaQuery({ query: "(max-width: 1012px)" });
  const isXLargeScreen = useMediaQuery({ query: "(max-width: 1280px)" });
  const isLessThan1296 = useMediaQuery({ query: "(max-width: 1296px)" });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(); 

  const [preloadedUserFormData, setPreloadedUserFormData] = useState([]);

  // Obtain 'authenticated' date that is fed around the application
  useEffect(() => {
    setIsAuthenticatedDataLoading(true);
    const getData = () => {
      dataHttpServices
        .getAllData()
        .then((returnedData) => {
          setOrganization(returnedData);
          setIsAuthenticatedDataLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (userData) {
      getData();
    }
  }, [userData, userDateRange, parametersDataTimeInterval]);

  // Feed authenticated data into application
  useEffect(() => {
    // Ensure organization object is not empty
    if (
      Object.keys(organization).length > 0 &&
      organization.constructor === Object
    ) {
      // If nothing is checked, render organization's data
      // Otherwise, render data from checked items
      if (
        Object.keys(checkedItems).length === 0 &&
        checkedItems.constructor === Object
      ) {
        setRefinedRenderedData(getRefinedOrganizationData(organization));
      } else {
        const renderedDataArray = Object.values(renderedDataObjects);
        setRefinedRenderedData(getRenderedData(renderedDataArray));
      }
    }
  }, [organization, checkedItems, renderedDataObjects]);

  // Authenticate user based on login details saved to localstorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedWyreUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dataHttpServices.setUserId(user.data.id);
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

        isAuthenticatedDataLoading: isAuthenticatedDataLoading,

        currentUrl: currentUrl,
        setCurrentUrl: setCurrentUrl,
        powerQualityUnit: powerQualityUnit,
        setPowerQualityUnit: setPowerQualityUnit,
        setUserDateRange: setUserDateRange,
        setParametersDataTimeInterval: setParametersDataTimeInterval,

        isUserAdmin: isUserAdmin,
        setIsUserAdmin: setIsUserAdmin,

        isSmallScreen: isSmallScreen,
        isMediumScreen: isMediumScreen,
        isLargeScreen: isLargeScreen,
        isXLargeScreen: isXLargeScreen,
        isLessThan1296: isLessThan1296,

        useMediaQuery: useMediaQuery,

        username: username,
        setUsername: setUsername,
        password: password,
        setPassword: setPassword,
        userData: userData,
        setUserData: setUserData,
        token: token,
        setToken: setToken,

        preloadedUserFormData: preloadedUserFormData,
        setPreloadedUserFormData: setPreloadedUserFormData,
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
