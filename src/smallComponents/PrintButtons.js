import React, { useContext } from 'react';

import PdfIcon from '../icons/PdfIcon';
import PrintIcon from '../icons/PrintIcon';

import CompleteDataContext from '../Context';

import axios from 'axios';

import { ScheduleEmailModal } from '../components/ScheduleEmailModal';

function PrintButtons() {
  const PdfDownloadLink = async () => {
    const { checkedItems, allDevices, checkedDevices } = useContext(
      CompleteDataContext
    );

    console.log(allDevices);

    // let filterAllDevices = allDevices.forEach((devicesId)=>{
    //   return
    // })

    let getUserData = localStorage.getItem('loggedWyreUser');
    let parsedData = JSON.parse(getUserData);
    let DateEndPointRange = localStorage.getItem('DateEndPointRange');
    let parsedDateEndpointRange = JSON.parse(DateEndPointRange);
    let userId = parsedData.data.id;
    let token = parsedData.data.token;

    const staticUrl = `https://wyreng.xyz/api/v1/report_download/${userId}/${parsedDateEndpointRange}/`;

    const data = {
      selectedDevices: checkedItems,
    };

    const response = axios.post(staticUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    });
    console.log(response.data);
  };

  const modal = <ScheduleEmailModal />;

  return (
    <ul className="print-buttons h-hidden-medium-down">
      <li className="print-button-container">
        <button type="button" className="print-button">
          {modal}
        </button>
      </li>
      <li className="print-button-container">
        <a
          // href={staticUrl}
          onClick={PdfDownloadLink}
          target="_blank"
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
