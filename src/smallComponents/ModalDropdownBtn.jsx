import React from 'react'
import { Dropdown, Button} from 'antd';

import { DownOutlined } from '@ant-design/icons';

export const ModalDropdownBtn = ({ dropDownList, text, onTouch }) => {

  return (
    <Dropdown overlay={dropDownList} size="large">
      <Button onMouseOver={onTouch}>
        {text} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

