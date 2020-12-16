import React, { useContext } from 'react';
import onClickOutside from 'react-onclickoutside';
import CompleteDataContext from '../Context';

function HeaderNav({ children, className }) {
  const { isNavOpen, setIsNavOpen } = useContext(CompleteDataContext);
  HeaderNav.handleClickOutside = () => setIsNavOpen(false);

  return <nav className={className}>{children}</nav>;
}

const clickOutsideConfig = {
  handleClickOutside: () => HeaderNav.handleClickOutside,
};

export default onClickOutside(HeaderNav, clickOutsideConfig);
