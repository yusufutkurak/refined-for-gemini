// modules/pdf.js
window.Midnight = window.Midnight || {};

window.Midnight.PDF = {
    export: function () {
        const conversationContainers = document.querySelectorAll('.conversation-container');

        if (!conversationContainers || conversationContainers.length === 0) {
            alert("No conversation content found. Please refresh the page.");
            return;
        }

        // --- 1. PREPARE HTML CONTENT ---
        let rebuiltHTML = "";

        conversationContainers.forEach((container) => {
            const userQueryNode = container.querySelector('.user-query-container .query-text');
            const modelResponseNode = container.querySelector('message-content .markdown');

            if (userQueryNode) {
                rebuiltHTML += `
                    <div class="message-wrapper user-wrapper">
                        <div class="message-box user-box">
                            <strong>You:</strong><br>
                            ${userQueryNode.innerHTML}
                        </div>
                    </div>`;
            }

            if (modelResponseNode) {
                rebuiltHTML += `
                    <div class="message-wrapper model-wrapper">
                        <div class="message-box model-box">
                            <strong>Gemini:</strong>
                            <div class="markdown-content">
                                ${modelResponseNode.innerHTML}
                            </div>
                        </div>
                    </div>
                    <hr class="separator">`;
            }
        });

        // --- 2. OPEN WINDOW ---
        const printWindow = window.open('', '_blank', 'height=900,width=800');

        if (!printWindow) {
            alert("Please allow pop-ups for this site to download the PDF.");
            return;
        }

        // --- 3. INJECT HTML & CSS ---
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Gemini Chat Export</title>
                <style>
                    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #fff; color: #333; padding: 40px; line-height: 1.6; }
                    #content-wrapper { max-width: 800px; margin: 0 auto; }
                    .message-wrapper { display: flex; margin-bottom: 20px; width: 100%; }
                    .user-wrapper { justify-content: flex-end; }
                    .model-wrapper { justify-content: flex-start; }
                    .user-box { background: #f0f4f8; color: #1e293b; padding: 15px 20px; border-radius: 18px 18px 2px 18px; max-width: 80%; border: 1px solid #e2e8f0; }
                    .model-box { background: #fff; color: #000; padding: 10px 0; width: 100%; }
                    .separator { border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0; }
                    pre { background: #f6f8fa; border: 1px solid #d0d7de; border-radius: 6px; padding: 16px; overflow-x: auto; font-family: monospace; page-break-inside: avoid; }
                    code { font-family: monospace; background: #f6f8fa; padding: 2px 4px; border-radius: 4px; }
                    img { max-width: 100%; height: auto; }
                    a { color: #2563eb; text-decoration: none; }
                    .header-bar { position: sticky; top: 0; background: #fff; padding: 15px; border-bottom: 2px solid #eee; text-align: center; margin-bottom: 30px; z-index: 999; }
                    .btn-print { background: #2563eb; color: white; border: none; padding: 10px 24px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 14px; }
                    .btn-print:hover { background: #1d4ed8; }
                    @media print { .header-bar { display: none; } body { padding: 0; } }
                </style>
            </head>
            <body>
                <div class="header-bar">
                    <button id="printBtn" class="btn-print">🖨️ PRINT / SAVE PDF</button>
                </div>
                <div id="content-wrapper">
                    <h2 style="text-align:center; color:#555; margin-bottom:30px;">Chat History</h2>
                    ${rebuiltHTML}
                </div>
            </body>
            </html>
        `);

        printWindow.document.close();

        // --- 4. ATTACH EVENTS EXTERNALLY ---
        setTimeout(() => {
            const btn = printWindow.document.getElementById('printBtn');
            if (btn) btn.addEventListener('click', () => printWindow.print());
            printWindow.print();
        }, 500);
    }
};