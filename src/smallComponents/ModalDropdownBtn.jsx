import React from 'react'
import { Dropdown, Button} from 'antd';

import { DownOutlined } from '@ant-design/icons';

export const ModalDropdownBtn = ({ dropDownList, text }) => {

  return (
    <Dropdown overlay={dropDownList} size="large">
      <Button>
        {text} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

