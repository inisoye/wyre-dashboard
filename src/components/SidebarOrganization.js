import React, { useState } from 'react';

import SidebarBranch from '../components/SidebarBranch';

import PlusIcon from '../icons/PlusIcon';
import MinusIcon from '../icons/MinusIcon';

function SidebarOrganization({ orgData }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const Icon = isOpen ? <MinusIcon /> : <PlusIcon />;

  const branchComponents =
    orgData.branches && isOpen
      ? orgData.branches.map((eachBranch) => {
          return <SidebarBranch branchData={eachBranch} key={eachBranch.id} />;
        })
      : '';

  return (
    <li className='sidebar-org'>
      <div className='sidebar-org__details'>
        <span>{orgData.name}</span>
        {orgData.branches ? (
          <button className='sidebar-org__button' onClick={handleToggle}>
            {Icon}
          </button>
        ) : (
          ''
        )}
      </div>

      <ul className='sidebar-org__branches'>{branchComponents}</ul>
    </li>
  );
}

export default SidebarOrganization;
