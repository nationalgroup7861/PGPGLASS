import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';

export default async (req, res) => {
  const chatData = req.body.chatData;

  const filename = `chat_export_${uuidv4()}.xlsx`;
  const filePath = join('public', 'exports', filename);

  const ws = XLSX.utils.json_to_sheet(chatData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Chat Data');
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

  // Write the Excel buffer to a file
  await writeFile(filePath, excelBuffer);

  // Send the download link to the client
  res.status(200).json({ fileUrl: `/exports/${filename}` });
};
