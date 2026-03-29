// Simple test script for SMTP functionality
// Run with: node test-email.js

require('dotenv').config();

async function testSMTPConnection() {
  console.log('Testing SMTP configuration...');
  console.log('SMTP Host:', process.env.SMTP_HOST);
  console.log('SMTP Port:', process.env.SMTP_PORT);
  console.log('SMTP User:', process.env.SMTP_USER);
  console.log('SMTP Password:', process.env.SMTP_PASSWORD ? '***[SET]***' : '***[NOT SET]***');
  
  try {
    // Import the email service
    const { verifyEmailConnection, sendEmail } = require('./app/lib/email.ts');
    
    // Test connection
    console.log('\nTesting SMTP connection...');
    const connectionValid = await verifyEmailConnection();
    console.log('Connection test result:', connectionValid ? 'SUCCESS' : 'FAILED');
    
    if (connectionValid) {
      console.log('\nSending test email...');
      const emailSent = await sendEmail({
        to: process.env.SMTP_USER || 'info@srisaradiscientific.com',
        subject: 'SMTP Test Email',
        text: 'This is a test email to verify SMTP configuration is working properly.',
        html: '<h2>SMTP Test Email</h2><p>This is a test email to verify SMTP configuration is working properly.</p>'
      });
      
      console.log('Test email result:', emailSent ? 'SUCCESS' : 'FAILED');
    }
    
  } catch (error) {
    console.error('Error during SMTP test:', error.message);
  }
}

testSMTPConnection();