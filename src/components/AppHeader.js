import React, { useContext } from 'react';
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
import HeaderGroup1AndNav from './groups/HeaderGroup1AndNav';

function Header() {
  const {
    isNavOpen,
    setIsNavOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    isNavLinkDropdownOpen,
    setIsNavLinkDropdownOpen,
  } = useContext(CompleteDataContext);

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

  const toggleNavAndDropdown = () => {
    toggleNav();
    toggleNavLinkDropdown();
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
            <HeaderLink onClick={toggleNav} url='/' linkText='Dashboard' />

            <HeaderLink
              onClick={toggleNav}
              url='/score-card'
              linkText='Score Card'
            />

            <HeaderLinkWithDropdown className='header-nav-list__item header-link-with-dropdown'>
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

            <li className='header-nav-list__item header-avater-container h-hidden-1296-up'>
              <button onClick={toggleNav} className='header-avatar'>
                <img src={avatar} alt='' />
              </button>
            </li>
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

        <button className='header-avatar'>
          <img src={avatar} alt='' />
        </button>
      </div>
    </header>
  );
}

export default Header;
