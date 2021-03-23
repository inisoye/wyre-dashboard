import React from 'react'
import { Dropdown, Button} from 'antd';

import { DownOutlined } from '@ant-design/icons';

export const ModalDropdownBtn = ({ dropDownList, text }) => {
//   function handleButtonClick(e) {
//     message.info('Click on left button.');
//     console.log('click left button', e);
//   }

  return (
    <Dropdown overlay={dropDownList} size="large">
      <Button>
        {text} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

