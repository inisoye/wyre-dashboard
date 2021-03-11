import React, {useContext} from 'react';

import PdfIcon from '../icons/PdfIcon';
import PrintIcon from '../icons/PrintIcon';

import CompleteDataContext from '../Context';

import axios from 'axios'

import dataHttpServices from '../services/devices'

import { ScheduleEmailModal } from '../components/ScheduleEmailModal';


function PrintButtons() {
  

  const PdfDownloadLink = async () =>{
    let getUserData = localStorage.getItem('loggedWyreUser');
    let parsedData = JSON.parse(getUserData) 
    let userId = parsedData.data.id;
    let token = parsedData.data.token
    const staticUrl = `https://wyreng.com/api/v1/billdownload/${userId}/`

    const response = await axios.get(staticUrl, {
      headers:{'Authorization' : `bearer ${token}`}
    })
    return response.data
}

const { setIsModalVisible } = useContext(CompleteDataContext);

const modal = <ScheduleEmailModal />

  return (
    <ul className="print-buttons h-hidden-medium-down">
      <li className="print-button-container">
          {/* <button type="button" className="print-button"> */}
            { modal }
          {/* </button> */}
      </li>
      <li className="print-button-container">
        <a
          href="#"
          className="print-button"
        >
          <PdfIcon />
        </a>
      </li>
      <li className="print-button-container">
        <button type="button" className="print-button">
          <PrintIcon />
        </button>
      </li>
    </ul>
  );
}

export default PrintButtons;
