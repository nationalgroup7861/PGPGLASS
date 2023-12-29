import React from 'react';
import * as XLSX from 'xlsx';

export function exportToExcel(chatreport) {
  // Reverse the data so that the latest chat shows first
  const reversedChatReport = [...chatreport].reverse();

  // Prepare the data as an array of arrays
  const data = [["Role", "Content"]]; // First row is for headers
  reversedChatReport.forEach((chat) => {
    const row = [chat.role, chat.content];
    data.push(row);
  });
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Chat Report');

  // Export the data as a Uint8Array
  const excelData = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Convert the Uint8Array to a Blob
  const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'chatreport.xlsx';
  a.click();

  URL.revokeObjectURL(url);
}
