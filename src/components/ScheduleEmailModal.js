import React, { useContext, useEffect, useState } from 'react';

import {
  Modal,
  Row,
  Col,
  Menu,
  Checkbox,
  Input
} from 'antd';

import CompleteDataContext from '../Context';
import ScheduleEmailBtn from '../icons/ScheduleEmailBtn';


import dataHttpServices from '../services/devices';

import { Hr } from '../icons/Hr';

import { ModalBtns } from '../smallComponents/ModalBtns'
import { ModalDropdownBtn } from '../smallComponents/ModalDropdownBtn'

import  { useFetchScheduleEmailData, usePostScheduleEmailData} from '../helpers/FetchScheduleEmailData'

export const ScheduleEmailModal = () => {
  const { isModalVisible, setIsModalVisible, token, userId, allDevices, checkedDevices  } = useContext(
    CompleteDataContext
  );

  const [emailModalData, setEmailModalData] = useState([])
  const [addEmail, setAddEmail] = useState('')
  const [sendBill, setSendBill] = useState('')
  const [ExternalRecieverAvailableDevices,setExternalRecieverAvailableDevices ] = useState([])
  const [frequencyDropdown, setFrequencyDropdown] = useState([])
  const [personalDataAvailableDevices, setPersonalDataAvailableDevices] = useState([])

  
  const dateRange = dataHttpServices.endpointDateRange;

  const getemailModalDataUrl = `https://wyreng.xyz/api/v1/mail_schedules_data/${userId}/`;
  const addNewExternalReceiverUrl = `https://wyreng.xyz/api/v1/add_external_bill_reciever/${userId}/` 
  const addavailableDevicesToBillReceiver = `https://wyreng.xyz/api/v1/add_assigned_devices/${userId}/`
  const deleteBillReceiver = `https://wyreng.xyz/api/v1/delete_mail_reciever/${userId}/`
  const sendBillUrl = `https://wyreng.xyz/api/v1/send_report/${userId}/${dateRange}`

  useFetchScheduleEmailData(getemailModalDataUrl, setEmailModalData)

  const ShowModal = () => { 
    console.log('The data:', emailModalData) 
    console.log([emailModalData.data].map(testData => {
        [testData.personal_data].map(secData =>{
          [secData.assigned_devices].map(data => data.id)
        })
    }) )
    // console.log(emailModalData.data.personal_data.assigned_devices[0].name)
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFrequencyMenuClick = (e) => {
    setFrequencyDropdown(e.key)
    console.log('click', e.key);
  };

  const handleDevicesMenuClick = (v)=>{
    setExternalRecieverAvailableDevices(v.key)
    console.log('Devices selected', ExternalRecieverAvailableDevices)
  }

  const handlePersonalDataDevicesMenuClick = (Devices)=>{
    setPersonalDataAvailableDevices(Devices.key)
    console.log('Devices selected', personalDataAvailableDevices)
  }


  // const personalDataDevices = [emailModalData.data].map((assignedDevices) => {
  //     [assignedDevices.personal_data].map((getDevices) =>{
  //       [getDevices.assigned_devices].map((device) =>(  
  //       <Menu onClick={handleDevicesMenuClick} selectedkeys={[ ExternalRecieverAvailableDevices ]}>
  //         <Menu.Item key= { device.device_id}>
  //           {device.device_name}
  //           <Checkbox style={{marginLeft:"20px"}}/>
  //         </Menu.Item> 
  //       </Menu>
  //       ))
  //     })
  // })



  // const availableDevicesDropdownList =  [emailModalData].map(availableDevices => {
  //   [availableDevices.available_devices].map((devicesavailable) => (
  //   <Menu onClick={handlePersonalDataDevicesMenuClick} selectedkeys={[ personalDataAvailableDevices ]}>
  //       <Menu.Item key= {devicesavailable.device_id}>
  //         {devicesavailable.device_name}
  //         <Checkbox style={{marginLeft:"20px"}}/>
  //       </Menu.Item>
  //     </Menu>
  //   ))
  // })


  const frequencyDropDownList = (
    <Menu onClick={handleFrequencyMenuClick} selectedKeys={[ frequencyDropdown ]}>
      <Menu.Item key="1" >Weekly</Menu.Item>
      <Menu.Item key="2">Bi-Weekly</Menu.Item>
      <Menu.Item key="3">Monthly</Menu.Item>
    </Menu>
  );

  const AddExternalReceiver = usePostScheduleEmailData(addNewExternalReceiverUrl, addEmail,)

  let selectedDevicesIds = []

  for (const prop in checkedDevices) {
      let listOfDeviceId = allDevices.filter((e) => {
        return e.name === prop;
      });
      selectedDevicesIds.push(listOfDeviceId[0].id);
    }

   const sendBillData = { 
      'selected_devices': selectedDevicesIds,
      'email': sendBill}
  let sendQuickBill = usePostScheduleEmailData(sendBillUrl, sendBillData);

  // Styles
  const emailStyles = {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    color: '#000000',
  };

  const rowStyles = {
       marginBottom: '50px', 
       marginTop: '30px' 
  }

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
    <>
      <button type="button" className="print-button" onClick={ShowModal} >
        <ScheduleEmailBtn />
      </button>
      {emailModalData.length <= 0 ? console.log('An error Ocurred try again') : [emailModalData].map((data)=> (
      <Modal
        visible={isModalVisible}
        style={{ top: 20 }}
        footer= {null}
        onCancel={handleCancel}
      >
        <Row justify="center">
          <Col>
            <p style={ModalHeaders}> External Reciever </p>
          </Col>
        </Row>
        <Hr/>
        <br/>
        { data.external_recievers > 0 ?
        <Row key={data.external_recievers.id}>
          <Col span={10} style={emailStyles}>
            {data.external_recievers.email}
          </Col>
          <Col span={10}>
            <ModalDropdownBtn dropDownList={availableDevicesDropdownList} text="Assigned Devices"/>
          </Col>
          <Col span={4}>
            <ModalBtns action="delete"/>
          </Col>
        </Row>
      : <Row justify="center"><Col><p>No External Receiver added</p></Col></Row> }

        <br />
        <Hr />

        <Row style={rowStyles}>
          <Col style={addEmailInputBox} span={8}>
            <Input placeholder="Add email" value={addEmail} onChange={(e)=> setAddEmail(e.target.value)}/>
          </Col>
          <Col span={4} style={{ marginLeft: '30px' }}>
              <ModalBtns action="add" onClick={AddExternalReceiver}/>
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
          style={rowStyles}
        >
          <Col span={12}>
              <ModalDropdownBtn dropDownList={personalDataDevices} text="Assigned Devices" />
          </Col>
          <Col>
            <ModalDropdownBtn dropDownList={frequencyDropDownList} text="Frequency"/>
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <p style={ModalHeaders}>Send A Quick Bill</p>
          </Col>
        </Row>
        <Hr />
        <Row justify="center" style={rowStyles}>
          <Col span={12} style={{marginRight:"20px"}}>
            <Input placeHolder="Enter email address" value={sendBill} onChange={(value)=> setSendBill(value.target.value)}/>
          </Col>
          <Col>
            <ModalBtns action="send" onClick={sendQuickBill}/>
          </Col>
        </Row>
      </Modal>
      ))}
      </>
  );
};
