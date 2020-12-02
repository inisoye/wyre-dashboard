import React, { useState, useContext } from 'react';
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
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { isSidebarOpen, setIsSidebarOpen } = useContext(CompleteDataContext);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className='header'>
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
          className='headerMenu-button hamburger-button h-hidden-medium-up'
          onClick={toggleNav}
        >
          <Hamburger className='headerMenu-button__image hamburger-button__image' />
        </button>
      </div>

      <nav
        className={isNavOpen ? 'header-nav' : 'header-nav h-hidden-medium-down'}
      >
        <ul className='header-nav-list'>
          <HeaderLink url='/' linkText='Dashboard' />
          <HeaderLink url='/score-card' linkText='Score Card' />
          <HeaderLink url='/parameters' linkText='Parameters' />
          <HeaderLink url='/report' linkText='Report' />
          <HeaderLink url='/cost-tracker' linkText='Cost Tracker' />
          <HeaderLink url='/billing' linkText='Billing' />
          <HeaderLink url='/messages' linkText='Messages' />

          <li className='h-hidden-medium-up'>
            <HeaderIcon
              className='header-icon'
              count={4}
              countClassName='header-icon__count'
            >
              <MessageIcon className='header-icon__image' />
            </HeaderIcon>
          </li>

          <li className='h-hidden-medium-up'>
            <HeaderIcon
              className='header-icon'
              count={2}
              countClassName='header-icon__count'
            >
              <NotificationIcon className='header-icon__image' />
            </HeaderIcon>
          </li>

          <li className='h-hidden-medium-up'>
            <button className='header-avatar'>
              <img src={avatar} alt='' />
            </button>
          </li>
        </ul>
      </nav>

      <div className='h-hidden-medium-down'>
        <HeaderIcon
          className='header-icon'
          count={4}
          countClassName='header-icon__count'
        >
          <MessageIcon className='header-icon__image' />
        </HeaderIcon>

        <HeaderIcon
          className='header-icon'
          count={2}
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
