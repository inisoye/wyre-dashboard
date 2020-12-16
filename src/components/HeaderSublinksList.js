import React, { useContext } from 'react';
import onClickOutside from 'react-onclickoutside';
import CompleteDataContext from '../Context';

function HeaderSublinksList({ children, className }) {
  const { isNavLinkDropdownOpen, setIsNavLinkDropdownOpen } = useContext(
    CompleteDataContext
  );
  HeaderSublinksList.handleClickOutside = () => setIsNavLinkDropdownOpen(false);

  return <ul className={className}>{children}</ul>;
}

const clickOutsideConfig = {
  handleClickOutside: () => HeaderSublinksList.handleClickOutside,
};

export default onClickOutside(HeaderSublinksList, clickOutsideConfig);
