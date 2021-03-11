import React, {useContext} from 'react'
import { Modal, Button } from 'antd'

import CompleteDataContext from '../Context';


import ScheduleEmailBtn from '../icons/ScheduleEmailBtn';

export const ScheduleEmailModal = () => {
    const { isModalVisible,setIsModalVisible } = useContext(CompleteDataContext);
    
    const ShowModal = () => {
    setIsModalVisible(true);
    console.log("I'm working");
    };


    const handleOk = () =>{
        setIsModalVisible(false)
    } 

    const handleCancel = () =>{
        setIsModalVisible(false)
    }
    return (
      <div>
        <Button type="button" className="print-button"  onClick={ShowModal}>
          {' '}
          <ScheduleEmailBtn />{' '}
        </Button>
        <Modal
          title="External Recievers"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some content</p>
          <p>Some Content</p>
        </Modal>
      </div>
    );
}
