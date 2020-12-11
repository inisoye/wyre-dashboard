import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CompleteDataContext from '../Context';

import HeaderLink from '../smallComponents/HeaderLink';
import HeaderIcon from '../smallComponents/HeaderIcon';

import Logo from '../icons/Logo';
import Hamburger from '../icons/Hamburger';
import VerticalDots from '../icons/VerticalDots';
import MessageIcon from '../icons/MessageIcon';
import NotificationIcon from '../icons/NotificationIcon';

import avatar from '../images/avatar.png';

function Header() {
  const { isNavOpen, setIsNavOpen } = useContext(CompleteDataContext);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(CompleteDataContext);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsNavOpen(false);
  };

  return (
    <header className='header'>
      <div className='header-group-1-and-nav'>
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
            <HeaderLink
              onClick={toggleNav}
              url='/parameters'
              linkText='Parameters'
            />
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
      </div>

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
