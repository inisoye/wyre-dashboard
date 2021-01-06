import React from 'react';
import onClickOutside from 'react-onclickoutside';

function HeaderMobileAvatarWithDropdown({
  children,
  className,
  setIsMobileAvatarMenuOpen,
}) {
  HeaderMobileAvatarWithDropdown.handleClickOutside = () =>
    setIsMobileAvatarMenuOpen(false);

  return <li className={className}>{children}</li>;
}

const clickOutsideConfig = {
  handleClickOutside: () => HeaderMobileAvatarWithDropdown.handleClickOutside,
};

export default onClickOutside(
  HeaderMobileAvatarWithDropdown,
  clickOutsideConfig
);
