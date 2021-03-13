import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfIcon from "../icons/PdfIcon";
import PrintIcon from "../icons/PrintIcon";

function PrintButtons({ onClick, document, fileName }) {
  return (
    <ul className="print-buttons h-hidden-medium-down">
      <li className="print-button-container">
        <button onClick={onClick} type="button" className="print-button">
          {/* <PDFDownloadLink
            document={document}
            fileName={fileName}
            // aria-label="Save PDF"
          >
            <PdfIcon />
          </PDFDownloadLink> */}
          <PdfIcon />
        </button>
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
