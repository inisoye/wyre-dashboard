import React, { useContext } from 'react';
import CompleteDataContext from '../Context';

import SidebarOrganization from './SidebarOrganization';

function Sidebar() {
  const { organization, isSidebarOpen } = useContext(CompleteDataContext);

  // Ensure data is loaded before sidebar is rendered
  const organizationComponent = organization.name && (
    <SidebarOrganization orgData={organization} />
  );

  return (
    <div className={isSidebarOpen ? 'sidebar' : 'sidebar h-hidden-medium-down'}>
      {<ul className='sidebar-org-container'>{organizationComponent}</ul>}
    </div>
  );
}

export default Sidebar;
