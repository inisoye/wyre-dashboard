import React from 'react';
import onClickOutside from 'react-onclickoutside';

function HeaderLinkWithDropdown({
  children,
  className,
  setIsNavLinkDropdownOpen,
}) {
  HeaderLinkWithDropdown.handleClickOutside = () =>
    setIsNavLinkDropdownOpen(false);

  return <li className={className}>{children}</li>;
}

const clickOutsideConfig = {
  handleClickOutside: () => HeaderLinkWithDropdown.handleClickOutside,
};

export default onClickOutside(HeaderLinkWithDropdown, clickOutsideConfig);
