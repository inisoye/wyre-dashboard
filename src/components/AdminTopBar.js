import React, { useContext } from 'react';
import CompleteDataContext from '../Context';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function TopBar() {
  const { isSidebarOpen, currentUrl } = useContext(CompleteDataContext);

  const isTopBarAdminOrganisationRightDisplayed = currentUrl.includes(
    'view-client'
  );

  const isTopBarAdminDeviceRightDisplayed = currentUrl.includes('view-devices');
  const isTopBarAdminDeviceRightDisplayed2 = currentUrl.includes('view-branches');
  const isTopBarAdminDeviceLeftDisplayed = currentUrl.includes('view-branches');
  const isTopBarAdminDeviceRightDisplayed3 = currentUrl.includes('branch01');


  const isTopBarDisplayed = !currentUrl.includes('hide-top-bar');

  return (
    <div className={isTopBarDisplayed ? 'displayed' : 'h-hidden-medium-up'}>
      <div
        className={isSidebarOpen ? 'top-bar' : 'top-bar h-hidden-medium-down'}
      >
        <div className={isTopBarAdminDeviceLeftDisplayed ? '.top-bar__left' : '.top-bar__left h-hide'}>
          <div className="search_input-wrapper">
            <Input className='search___input' placeholder="Branches" prefix={<SearchOutlined />} />
          </div>
        </div>
        <div></div>

        <div
          className={
            isTopBarAdminOrganisationRightDisplayed
              ? 'top-bar__right'
              : 'top-bar__right h-hide'
          }
        >
          <Link className='top-bar-right__button h-extra-padding' to='/add-devices' >
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
        <div
          className={
            isTopBarAdminDeviceRightDisplayed2
              ? 'top-bar__right'
              : 'top-bar__right h-hide'
          }
        >
          <Link
            className='top-bar-right__button h-extra-padding'
            to='/compare-branches'
          >
            Compare
          </Link>
          <Link
            className='top-bar-right__button h-extra-padding'
            to='/add-branches'
          >
            Add Branch
          </Link>
        </div>
        <div
          className={
            isTopBarAdminDeviceRightDisplayed3
              ? 'top-bar__right'
              : 'top-bar__right h-hide'
          }
        >
          <Link
            className='top-bar-right__button h-extra-padding'
            to=''
          >
            Add User
          </Link>
          <Link
            className='top-bar-right__button h-extra-padding'
            to='/add-branches'
          >
            Add Branch
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
