
import * as XLSX from 'xlsx';

export const exportToExcel = ({ header, data}) => {
  
  //Had to create a new workbook and then add the header
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.book_new();
  XLSX.utils.sheet_add_aoa(ws, header);
  
  //Starting in the second row to avoid overriding and skipping headers
  XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });

  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  const abc = Math.floor(Math.random() * 101);

  return XLSX.writeFile(wb, `${abc}power-demand.xlsx`);
}
