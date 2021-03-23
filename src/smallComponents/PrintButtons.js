import React, { useContext, useState } from 'react';

import PdfIcon from '../icons/PdfIcon';
import PrintIcon from '../icons/PrintIcon';

import CompleteDataContext from '../Context';
import dataHttpServices from '../services/devices';

import axios from 'axios';

import { ScheduleEmailModal } from '../components/ScheduleEmailModal';

function PrintButtons() {
  const { token, userId, allDevices, checkedDevices } = useContext(
    CompleteDataContext
  );

  const [pdfLink, setPdflink] = useState();

  const dateRange = dataHttpServices.endpointDateRange;

  const PdfDownloadLink = async () => {
    const staticUrl = `https://wyreng.xyz/api/v1/report_download/${userId}/${dateRange}/`;

    let selectedDevicesIds = [];

    for (const prop in checkedDevices) {
      let listOfDeviceId = allDevices.filter((e) => {
        return e.name === prop;
      });
      selectedDevicesIds.push(listOfDeviceId[0].id);
    }
    const data = { selected_devices: selectedDevicesIds };

    const response = axios
      .post(staticUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        return res.data
      })
      .catch((error) => console.log('Error downloading report:', error));

    return response;
  };

  const downloadUrl = `https://wyreng.xyz/api/v1/report_download/${userId}/${dateRange}/`;

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
          // href={pdfLink}
          onClick={PdfDownloadLink}
          target="_blank"
          className="print-button"
          rel="noreferrer"
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
