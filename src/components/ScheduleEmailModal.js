import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import {
  Modal,
  Row,
  Col,
  Menu,
  Dropdown,
  Button,
  message,
  Space,
  Input,
  Checkbox,
} from 'antd';

import { DownOutlined } from '@ant-design/icons';

import CompleteDataContext from '../Context';

import ScheduleEmailBtn from '../icons/ScheduleEmailBtn';

import { Hr } from '../icons/Hr';

export const ScheduleEmailModal = () => {
  const { isModalVisible, setIsModalVisible, userId, userToken } = useContext(
    CompleteDataContext
  );
  const getScheduledDataUrl = `https://wyreng.xyz/api/v1/mail_schedules_data/${userId}/`;
  const [scheduledData, setScheduledData] = useState({});

  useEffect(() => {
    axios
      .get(getScheduledDataUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${userToken}`,
        },
      })
      .then((resp) => {
        setScheduledData(resp.data);
        // console.log('device name:', resp.data.data.available_devices[0].device_name);
        // console.log('schedule i:', scheduledData);
      })
      .catch((error) => console.log(error));
  }, [getScheduledDataUrl]);

  const ShowModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };

  const handleMenuClick = (e) => {
    // message.info('Click on menu item.');
    console.log('click', e);
  };

  const checkBoxOnChange = (e) => {
    console.log(`checked =  ${e.target.checked}`);
  };

  const deviceDropdownList = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        Dipslay Device
        <Checkbox className="sidebar-checkbox" onChange={checkBoxOnChange} />
      </Menu.Item>
    </Menu>
  );

  const weeklyDropwnListMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Weekly</Menu.Item>
      <Menu.Item key="2">Bi-Weekly</Menu.Item>
      <Menu.Item key="3">Monthly</Menu.Item>
    </Menu>
  );

  // Styles
  const emailStyles = {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    color: '#000000',
  };

  const BtnStyles = {
    marginLeft: '20px',
    width: '80px',
    height: '34px',
    background: '#5616F5',
    borderRadius: '8px',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '15px',
    color: '#FFFFFF',
  };

  const addEmailInputBox = {
    marginLeft: '200px',
  };

  const ModalHeaders = {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#000000',
  };

  return (
    <div>
      <button type="button" className="print-button" onClick={ShowModal}>
        <ScheduleEmailBtn />
      </button>
      {/* {scheduledData.map((data) => ( */}
      <Modal
        title="External Recievers"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 20 }}
      >
        <Row>
          <Col span={10} style={emailStyles}>
            email@domain.com
          </Col>
          <Col span={10}>
            <Dropdown overlay={deviceDropdownList}>
              <Button>
                Assigned Devices <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col span={4}>
            <button type="button" style={BtnStyles}>
              Delete
            </button>
          </Col>
        </Row>

        <br />
        <Hr />

        <Row style={{ marginTop: '30px', marginBottom: '50px' }}>
          <Col style={addEmailInputBox} span={8}>
            <Input placeholder="Add email address" />
          </Col>
          <Col span={4} style={{ marginLeft: '30px' }}>
            <button type="submit" style={BtnStyles}>
              Add
            </button>
          </Col>
        </Row>
        <br />
        <Row justify="center">
          <Col>
            <p style={ModalHeaders}>Personal Mail Frequency</p>
          </Col>
        </Row>
        <Hr />
        <Row
          justify="center"
          style={{ marginBottom: '50px', marginTop: '30px' }}
        >
          <Col span={12}>
            <Dropdown overlay={deviceDropdownList}>
              <Button>
                Assigned Devices <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown overlay={weeklyDropwnListMenu}>
              <Button>
                Weekly <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <p style={ModalHeaders}>Send A Quick Bill</p>
          </Col>
        </Row>
        <Hr />
        <Row justify="center">
          <Col span={12}>
            <Input placeholder="Enter email address" />
          </Col>
          <Col>
            <button style={BtnStyles}>Send</button>
          </Col>
        </Row>
      </Modal>
      {/* )
        )} */}
    </div>
  );
};
