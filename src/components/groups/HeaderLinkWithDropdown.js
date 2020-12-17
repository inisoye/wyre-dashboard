import React, { useContext } from 'react';
import onClickOutside from 'react-onclickoutside';
import CompleteDataContext from '../../Context';

function HeaderLinkWithDropdown({ children, className }) {
  const { setIsNavLinkDropdownOpen } = useContext(CompleteDataContext);
  HeaderLinkWithDropdown.handleClickOutside = () => setIsNavLinkDropdownOpen(false);

  return <li className={className}>{children}</li>;
}

const clickOutsideConfig = {
  handleClickOutside: () => HeaderLinkWithDropdown.handleClickOutside,
};

export default onClickOutside(HeaderLinkWithDropdown, clickOutsideConfig);
