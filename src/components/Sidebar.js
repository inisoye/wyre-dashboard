import React, { useContext, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import CompleteDataContext from '../Context';
import { fetchSideBar } from '../redux/actions/sidebar/sidebar.action';

import SidebarOrganization from './SidebarOrganization';

function Sidebar({ fetchSideBar: fetchSideBarData}) {
  const sideBarData = useSelector((state) => state.sideBar.sideBarData);

  useEffect(() => {
    fetchSideBarData();
  }, [])

  const { organization, isSidebarOpen, currentUrl } = useContext(
    CompleteDataContext
  );

  const isReportPageOpen = currentUrl.includes('report');

  // Ensure data is loaded before sidebar is rendered
  const organizationComponent = sideBarData.name && (
    <SidebarOrganization orgData={sideBarData} />
  );

  return (
    <div
      className={
        isReportPageOpen
          ? 'h-hide'
          : isSidebarOpen
          ? 'sidebar'
          : 'sidebar h-hidden-medium-down'
      }
    >
      {<ul className="sidebar-org-container">{organizationComponent}</ul>}
    </div>
  );
}


const mapDispatchToProps = {
  fetchSideBar,
};

export default connect(null, mapDispatchToProps)(Sidebar);
