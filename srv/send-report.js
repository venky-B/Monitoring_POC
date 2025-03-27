const axios = require("axios");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables (optional for security)

// Configuration (Replace with your credentials)
const SMTP_CONFIG = {
    host:process.env.GMAIL_HOST,
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER, // Use environment variable or hardcoded email
        pass: process.env.EMAIL_PASS, // Use App Password (not normal password)
    },
};

// Create a Nodemailer Transporter
const transporter = nodemailer.createTransport(SMTP_CONFIG);

// Function to fetch data from OData Service and generate the report
async function fetchAndSendReport() {
    try {
        // Fetch Data
        const response = await axios.get("http://localhost:4004/odata/v4/catalog/fieldvalueservices");

        if (!response.data || !response.data.value) {
            throw new Error("Invalid OData response structure");
        }

        console.log("Fetched Data:", response.data.value); // Debugging

        // Extract relevant data
        const reportData = response.data.value.map((item, index) => ({
            serialNo: index + 1,
            tableName: item.tablename, // Ensure correct field mapping
            nullCount: item.nullcount, // Ensure correct field mapping
        }));

        // Generate HTML Report
        const reportHtml = generateBTPReport(reportData);

        // Send Email
        await sendEmail(reportHtml);
        console.log("✅ Email sent successfully!");
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

// Function to generate HTML report
function generateBTPReport(data) {
    if (!data || data.length === 0) {
        return `<h2>BTP Monitoring Report</h2><p>No data available.</p>`;
    }

    let html = `
        <h2>BTP Monitoring Report</h2>
        <table border="1" cellpadding="5" cellspacing="0">
            <tr>
                <th>S.No</th>
                <th>Table Name</th>
                <th>Null Count</th>
            </tr>`;

    data.forEach((row) => {
        let color = row.nullCount > 0 ? "red" : "black";
        html += `
            <tr>
                <td>${row.serialNo}</td>
                <td>${row.tableName}</td>
                <td style="color: ${color}; font-weight: bold;">${row.nullCount}</td>
            </tr>`;
    });

    html += `</table><p>Generated automatically by BTP Monitoring System.</p>`;
    return html;
}

// Function to send email
async function sendEmail(reportHtml) {
    const mailOptions = {
        from: SMTP_CONFIG.auth.user,
        to: "rajuvenkatesh98@gmail.com", // Change to the recipient's email
        subject: "BTP Monitoring Report",
        html: reportHtml, // Send the report as HTML
    };

    return transporter.sendMail(mailOptions);
}

// Run the function to fetch and send report
fetchAndSendReport();
