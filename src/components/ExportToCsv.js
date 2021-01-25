import React from "react"
import { notification } from "antd";
import { CSVLink } from "react-csv";

const ExportToCsv = ({ children, filename, csvHeaders, csvData }) => {

  return (
    <CSVLink onClick={() => notification.info({
      message: "Export to CSV",
      description:
        "Your download will start in a moment",
      duration: 5,
    })} filename={filename} headers={csvHeaders} data={csvData} target="_blank">
      {children}
    </CSVLink>
  )
}

export default ExportToCsv