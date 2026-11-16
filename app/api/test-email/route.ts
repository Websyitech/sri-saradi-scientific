import { NextResponse } from "next/server";
import { verifyEmailConnection, sendEmail } from "@/app/lib/email";

export async function GET() {
  try {
    console.log('Testing email configuration...');
    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      passwordSet: !!process.env.SMTP_PASSWORD
    });
    
    // First verify connection
    const connectionValid = await verifyEmailConnection();
    console.log('SMTP connection test:', connectionValid ? 'SUCCESS' : 'FAILED');
    
    if (!connectionValid) {
      return NextResponse.json({ 
        error: "SMTP connection failed",
        details: "Authentication failed. For Zoho, you may need to generate an App Password instead of using your regular email password.",
        troubleshooting: [
          "1. Go to Zoho Mail Security Settings",
          "2. Generate an App Password for SMTP",
          "3. Use that App Password instead of your email password",
          "4. Ensure 2FA is enabled on your Zoho account"
        ]
      }, { status: 500 });
    }
    
    // Send test email
    const testEmailSent = await sendEmail({
      to: process.env.SMTP_USER || 'info@srisaradiscientific.com',
      subject: 'SMTP Configuration Test - Sri Saradi Scientific',
      text: 'This is a test email to verify that the SMTP configuration is working properly.',
      html: `
        <h2>SMTP Configuration Test</h2>
        <p>This is a test email to verify that the SMTP configuration is working properly for Sri Saradi Scientific.</p>
        <p><strong>Test Details:</strong></p>
        <ul>
          <li>SMTP Host: ${process.env.SMTP_HOST}</li>
          <li>SMTP Port: ${process.env.SMTP_PORT}</li>
          <li>From Email: ${process.env.SMTP_FROM_EMAIL}</li>
          <li>Test Time: ${new Date().toISOString()}</li>
        </ul>
        <p>If you receive this email, your SMTP configuration is working correctly!</p>
      `
    });
    
    console.log('Test email sent:', testEmailSent ? 'SUCCESS' : 'FAILED');
    
    return NextResponse.json({
      success: true,
      message: "Email test completed successfully",
      results: {
        connectionTest: connectionValid,
        testEmailSent: testEmailSent
      }
    });
    
  } catch (error) {
    console.error('Email test error:', error);
    return NextResponse.json({ 
      error: "Email test failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { to, subject, message } = await request.json();
    
    if (!to || !subject || !message) {
      return NextResponse.json({ 
        error: "Missing required fields: to, subject, message" 
      }, { status: 400 });
    }
    
    console.log('Sending custom test email to:', to);
    
    const emailSent = await sendEmail({
      to,
      subject: `[Test] ${subject}`,
      text: message,
      html: `
        <h3>Test Email from Sri Saradi Scientific</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          This is a test email sent from the Sri Saradi Scientific website.
        </p>
      `
    });
    
    console.log('Custom test email sent:', emailSent ? 'SUCCESS' : 'FAILED');
    
    return NextResponse.json({
      success: emailSent,
      message: emailSent 
        ? "Test email sent successfully" 
        : "Failed to send test email"
    });
    
  } catch (error) {
    console.error('Custom test email error:', error);
    return NextResponse.json({ 
      error: "Failed to send test email",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}