import React from 'react';
import { Button } from '@mui/material';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { useEffect } from 'react';
import { IconEport } from '../../Pages/Icon/Icon';

export const ExportCSV = ({ csvData, fileName, use, download, cb }) => {
  // console.log(download);
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  };
  useEffect(() => {
    if (download) {
      exportToCSV(csvData, fileName);
      cb(false);
    }
  });

  return (
    <Button
      className="btn-export"
      variant="contained"
      onClick={() => {
        use(true);
      }}
    >
      <span style={{ paddingTop: '.2rem', paddingRight: '.5rem' }}>
        <IconEport />
      </span>
      Export Excel
    </Button>
  );
};
