import React from 'react';
import mammoth from 'mammoth';

export function exportToWord(chatreport) {
  // Create an HTML string from your chat report data
  const htmlContent = `
    <div>
      ${chatreport
        .map((chat) => {
          return `
            <p>
              <strong>${chat.role}</strong>: ${chat.content}
            </p>`;
        })
        .join('')}
    </div>
  `;

  // Convert HTML content to Word format using mammoth
  mammoth.convert({ html: htmlContent })
    .then((result) => {
      const blob = new Blob([result.value], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'chatreport.docx';
      a.click();

      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Error exporting to Word:', error);
    });
}
