import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CompleteDataContext from '../Context';

import HeaderLink from '../smallComponents/HeaderLink';
import HeaderIcon from '../smallComponents/HeaderIcon';
import HeaderSublink from '../smallComponents/HeaderSublink';

import Logo from '../icons/Logo';
import Hamburger from '../icons/Hamburger';
import VerticalDots from '../icons/VerticalDots';
import MessageIcon from '../icons/MessageIcon';
import NotificationIcon from '../icons/NotificationIcon';
import ChevronDown from '../icons/ChevronDown';

import avatar from '../images/avatar.png';

import HeaderLinkWithDropdown from './groups/HeaderLinkWithDropdown';
import HeaderMobileAvatarWithDropdown from './groups/HeaderMobileAvatarWithDropdown';
import HeaderDesktopAvatarWithDropdown from './groups/HeaderDesktopAvatarWithDropdown';
import HeaderGroup1AndNav from './groups/HeaderGroup1AndNav';
import ProfileIcon from '../icons/ProfileIcon';
import OverviewIcon from '../icons/OverviewIcon';
import PadlockIcon from '../icons/PadlockIcon';
import SettingsIcon from '../icons/SettingsIcon';
import LogoutIcon from '../icons/LogoutIcon';

function Header() {
  const {
    isNavOpen,
    setIsNavOpen,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useContext(CompleteDataContext);

  const [isNavLinkDropdownOpen, setIsNavLinkDropdownOpen] = useState(false);
  const [isMobileAvatarMenuOpen, setIsMobileAvatarMenuOpen] = useState(false);
  const [isDesktopAvatarMenuOpen, setIsDesktopAvatarMenuOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsNavOpen(false);
  };

  const toggleNavLinkDropdown = () => {
    setIsNavLinkDropdownOpen(!isNavLinkDropdownOpen);
  };

  const toggleMobileAvatarMenu = () => {
    setIsMobileAvatarMenuOpen(!isMobileAvatarMenuOpen);
  };

  const toggleDesktopAvatarMenu = () => {
    setIsDesktopAvatarMenuOpen(!isDesktopAvatarMenuOpen);
  };

  const toggleNavAndDropdown = () => {
    toggleNav();
    toggleNavLinkDropdown();
    toggleMobileAvatarMenu();
  };

  return (
    <header className='header'>
      <HeaderGroup1AndNav className='header-group-1-and-nav'>
        {' '}
        <div className='header-group-1'>
          <button
            className='headerMenu-button dotmenu-button h-hidden-medium-up'
            onClick={toggleSidebar}
          >
            <VerticalDots className='headerMenu-button__image dotmenu-button__image' />
          </button>

          <Link className='header-logo' to='/'>
            <Logo className='header-logo__image' />
          </Link>

          <button
            className='headerMenu-button hamburger-button h-hidden-1296-up'
            onClick={toggleNav}
          >
            <Hamburger className='headerMenu-button__image hamburger-button__image' />
          </button>
        </div>
        <nav
          className={isNavOpen ? 'header-nav' : 'header-nav h-hidden-1296-down'}
        >
          <ul className='header-nav-list'>
            <HeaderLink
              onClick={toggleNav}
              url='/'
              linkText='Dashboard'
            />

            <HeaderLink
              onClick={toggleNav}
              url='/score-card'
              linkText='Score Card'
            />

            <HeaderLinkWithDropdown
              className='header-nav-list__item header-link-with-dropdown'
              setIsNavLinkDropdownOpen={setIsNavLinkDropdownOpen}
            >
              <button
                className='header-link-dropdown-button'
                onClick={toggleNavLinkDropdown}
              >
                Parameters
                <ChevronDown className='header-link-dropdown-icon' />
              </button>

              <ul
                className={
                  isNavLinkDropdownOpen
                    ? 'header-sublinks-list'
                    : 'header-sublinks-list h-hide'
                }
              >
                <HeaderSublink
                  onClick={toggleNavAndDropdown}
                  url='/parameters/energy-consumption'
                  linkText='Energy Consumption'
                />
                <HeaderSublink
                  onClick={toggleNavAndDropdown}
                  url='/parameters/power-quality'
                  linkText='Power Quality'
                />
                <HeaderSublink
                  onClick={toggleNavAndDropdown}
                  url='/parameters/power-demand'
                  linkText='Power Demand'
                />
                <HeaderSublink
                  onClick={toggleNavAndDropdown}
                  url='/parameters/time-of-use'
                  linkText='Time of Use'
                />
                <HeaderSublink
                  onClick={toggleNavAndDropdown}
                  url='/parameters/last-reading'
                  linkText='Last Reading'
                />
              </ul>
            </HeaderLinkWithDropdown>

            <HeaderLink onClick={toggleNav} url='/report' linkText='Report' />

            <HeaderLink
              onClick={toggleNav}
              url='/cost-tracker'
              linkText='Cost Tracker'
            />

            <HeaderLink onClick={toggleNav} url='/billing' linkText='Billing' />

            <HeaderLink
              onClick={toggleNav}
              url='/messages'
              linkText='Messages'
            />

            <li className='header-nav-list__item h-hidden-1296-up'>
              <HeaderIcon
                onClick={toggleNav}
                count={4}
                countClassName='header-icon__count'
              >
                <MessageIcon className='header-icon__image' />
              </HeaderIcon>
            </li>

            <li className='header-nav-list__item h-hidden-1296-up'>
              <HeaderIcon
                onClick={toggleNav}
                count={2}
                countClassName='header-icon__count'
              >
                <NotificationIcon className='header-icon__image' />
              </HeaderIcon>
            </li>

            <HeaderMobileAvatarWithDropdown
              className='header-nav-list__item header-avater-container h-hidden-1296-up'
              setIsMobileAvatarMenuOpen={setIsMobileAvatarMenuOpen}
            >
              <button
                onClick={toggleMobileAvatarMenu}
                className='header-avatar'
              >
                <img src={avatar} alt='' />
              </button>

              <ul
                className={
                  isMobileAvatarMenuOpen
                    ? 'header-sublinks-list'
                    : 'header-sublinks-list h-hide'
                }
              >
                <li className='header-sublinks-list__item avatar-sublink-item'>
                  <Link
                    className='header-sublink avatar-sublink'
                    onClick={toggleNavAndDropdown}
                    to='/client-profile'
                  >
                    <ProfileIcon /> <span>Personal Data</span>
                  </Link>
                </li>

                <li className='header-sublinks-list__item avatar-sublink-item'>
                  <Link
                    className='header-sublink avatar-sublink'
                    onClick={toggleNavAndDropdown}
                    to='#'
                  >
                    <OverviewIcon /> <span>Overview</span>
                  </Link>
                </li>

                <li className='header-sublinks-list__item avatar-sublink-item'>
                  <Link
                    className='header-sublink avatar-sublink'
                    onClick={toggleNavAndDropdown}
                    to='/password'
                  >
                    <PadlockIcon /> <span>Password</span>
                  </Link>
                </li>

                <li className='header-sublinks-list__item avatar-sublink-item'>
                  <Link
                    className='header-sublink avatar-sublink'
                    onClick={toggleNavAndDropdown}
                    to='#'
                  >
                    <SettingsIcon /> <span>Settings</span>
                  </Link>
                </li>

                <li className='header-sublinks-list__item avatar-sublink-item'>
                  <Link
                    className='header-sublink avatar-sublink'
                    onClick={toggleNavAndDropdown}
                    to='#'
                  >
                    <LogoutIcon /> <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </HeaderMobileAvatarWithDropdown>
          </ul>
        </nav>
      </HeaderGroup1AndNav>

      <div className='all-header-icons h-hidden-1296-down'>
        <HeaderIcon
          count={4}
          iconClassName='message-icon'
          countClassName='header-icon__count'
        >
          <MessageIcon className='header-icon__image' />
        </HeaderIcon>

        <HeaderIcon
          count={2}
          iconClassName='notification-icon'
          countClassName='header-icon__count'
        >
          <NotificationIcon className='header-icon__image' />
        </HeaderIcon>

        <HeaderDesktopAvatarWithDropdown
          setIsDesktopAvatarMenuOpen={setIsDesktopAvatarMenuOpen}
        >
          <button onClick={toggleDesktopAvatarMenu} className='header-avatar'>
            <img src={avatar} alt='' />
          </button>

          <ul
            className={
              isDesktopAvatarMenuOpen
                ? 'header-sublinks-list avatar-sublinks-list'
                : 'header-sublinks-list avatar-sublinks-list h-hide'
            }
          >
            <li className='header-sublinks-list__item avatar-sublink-item'>
              <Link
                className='header-sublink avatar-sublink'
                to='/client-profile'
              >
                <ProfileIcon /> <span>Personal Data</span>
              </Link>
            </li>

            <li className='header-sublinks-list__item avatar-sublink-item'>
              <Link className='header-sublink avatar-sublink' to='#'>
                <OverviewIcon /> <span>Overview</span>
              </Link>
            </li>

            <li className='header-sublinks-list__item avatar-sublink-item'>
              <Link className='header-sublink avatar-sublink' to='/password'>
                <PadlockIcon /> <span>Password</span>
              </Link>
            </li>

            <li className='header-sublinks-list__item avatar-sublink-item'>
              <Link className='header-sublink avatar-sublink' to='#'>
                <SettingsIcon /> <span>Settings</span>
              </Link>
            </li>

            <li className='header-sublinks-list__item avatar-sublink-item'>
              <Link className='header-sublink avatar-sublink' to='#'>
                <LogoutIcon /> <span>Logout</span>
              </Link>
            </li>
          </ul>
        </HeaderDesktopAvatarWithDropdown>
      </div>
    </header>
  );
}

export default Header;
