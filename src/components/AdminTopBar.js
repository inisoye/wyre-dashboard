import React, { useContext } from 'react';
import CompleteDataContext from '../Context';
import { Link } from 'react-router-dom';

function TopBar() {
  const { isSidebarOpen, currentUrl } = useContext(CompleteDataContext);

  const isTopBarAdminOrganisationRightDisplayed = currentUrl.includes(
    'view-client'
  );

  const isTopBarAdminDeviceRightDisplayed = currentUrl.includes('view-devices');

  const isTopBarDisplayed = !currentUrl.includes('hide-top-bar');

  return (
    <div className={isTopBarDisplayed ? 'displayed' : 'h-hidden-medium-up'}>
      <div
        className={isSidebarOpen ? 'top-bar' : 'top-bar h-hidden-medium-down'}
      >
        <div className='top-bar__left'></div>

        <div
          className={
            isTopBarAdminOrganisationRightDisplayed
              ? 'top-bar__right'
              : 'top-bar__right h-hide'
          }
        >
          <Link className='top-bar-right__button h-extra-padding'  to='/add-devices' >
            Add Client
          </Link>

        </div>

        <div
          className={
            isTopBarAdminDeviceRightDisplayed
              ? 'top-bar__right'
              : 'top-bar__right h-hide'
          }
        >
          <Link
            className='top-bar-right__button h-extra-padding'
            to='/add-devices'
          >
            Add Device
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
