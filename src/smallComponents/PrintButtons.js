import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfIcon from "../icons/PdfIcon";
import PrintIcon from "../icons/PrintIcon";

function PrintButtons({ onClick, document, fileName }) {
  return (
    <ul className="print-buttons h-hidden-medium-down">
      <li className="print-button-container">
        <a
          href="https://www.docformats.com/download/conditional-approval-letter/?wpdmdl=980066&refresh=6047330619b691615278854"
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
