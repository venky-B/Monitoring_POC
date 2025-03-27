const axios = require("axios");

async function fetchAndGenerateReport() {
    try {
        // Fetch Data from OData Service
        const response = await axios.get("http://localhost:4004/odata/v4/catalog/fieldvalueservices");

        // console.log(response);
        
        // Extract data (modify according to your OData structure)
        const reportData = response.data.value.map((item) => ({
            tableName: item.tablename, // Ensure this matches your OData fields
            nullCount: item.nullcount  // Ensure this matches your OData fields
        }));

        // Generate Report
        return generateBTPReport(reportData);
    } catch (error) {
        console.error("Error fetching OData:", error);
        return "<p>Error generating report. Check logs for details.</p>";
    }
}

function generateBTPReport(data) {
    let html = `
        <h2>BTP Monitoring Report</h2>
        <table border="1" cellpadding="5" cellspacing="0">
            <tr>
                <th>S.No</th>
                <th>Table Name</th>
                <th>Null Count</th>
            </tr>`;

    data.forEach((row, index) => {
        let color = row.nullCount > 0 ? "red" : "black"; // Highlight if nullCount > 0
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${row.tableName}</td>
                <td style="color: ${color}; font-weight: bold;">${row.nullCount}</td>
            </tr>`;
    });

    html += `</table><p>Generated automatically by BTP Monitoring System.</p>`;
    return html;
}

// Run Function and Print Report
fetchAndGenerateReport().then(report => {
    console.log(report); // You can send this via email instead
});

// Export function if needed in another module
module.exports = { fetchAndGenerateReport };