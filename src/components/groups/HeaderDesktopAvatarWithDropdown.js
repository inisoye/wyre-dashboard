import React from 'react';
import onClickOutside from 'react-onclickoutside';

function HeaderDesktopAvatarWithDropdown({
  children,
  className,
  setIsDesktopAvatarMenuOpen,
}) {
  HeaderDesktopAvatarWithDropdown.handleClickOutside = () =>
    setIsDesktopAvatarMenuOpen(false);

  return <div className={className}>{children}</div>;
}

const clickOutsideConfig = {
  handleClickOutside: () => HeaderDesktopAvatarWithDropdown.handleClickOutside,
};

export default onClickOutside(
  HeaderDesktopAvatarWithDropdown,
  clickOutsideConfig
);
