import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/app/lib/mailgun';

interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  product: string;
  message: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  return phone.length >= 10 && phoneRegex.test(phone);
}

function validateEnquiryData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!data.email || typeof data.email !== 'string' || !validateEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.phone || typeof data.phone !== 'string' || !validatePhoneNumber(data.phone)) {
    errors.push('Valid phone number is required');
  }

  if (!data.product || typeof data.product !== 'string' || data.product.trim().length === 0) {
    errors.push('Product/Service is required');
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.push('Message is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function generateCustomerEmailHTML(data: EnquiryData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0B1D33; color: #fff; padding: 20px; border-radius: 4px 4px 0 0; }
        .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 4px 4px; }
        .footer { font-size: 12px; color: #666; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
        .phone { font-weight: bold; color: #0F7B6C; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">Sri Saradi Scientific</h2>
        </div>
        <div class="content">
          <p>Dear ${data.name},</p>

          <p>Thank you for contacting Sri Saradi Scientific.</p>

          <p>We have received your enquiry and our team will get back to you within <strong>24 hours</strong> with the required details, including:</p>
          <ul>
            <li>Quotation</li>
            <li>COAs (if applicable)</li>
            <li>Product manuals</li>
            <li>MSDS documents</li>
          </ul>

          <p>We appreciate your patience. For urgent enquiries, please call us at <span class="phone">+91 7407607444</span>.</p>

          <p>Best regards,<br><strong>Sri Saradi Scientific Team</strong></p>
        </div>
        <div class="footer">
          <p>This is an automated response. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateCompanyEmailHTML(data: EnquiryData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0B1D33; color: #fff; padding: 20px; border-radius: 4px 4px 0 0; }
        .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 4px 4px; }
        .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .details-table th { background-color: #0F7B6C; color: #fff; padding: 12px; text-align: left; }
        .details-table td { padding: 12px; border-bottom: 1px solid #ddd; }
        .details-table tr:nth-child(even) { background-color: #f0f0f0; }
        .label { font-weight: bold; color: #0B1D33; width: 120px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">New Enquiry Received</h2>
        </div>
        <div class="content">
          <p><strong>A new enquiry has been submitted through the website.</strong></p>

          <table class="details-table">
            <tr>
              <th>Field</th>
              <th>Details</th>
            </tr>
            <tr>
              <td class="label">Name</td>
              <td>${data.name}</td>
            </tr>
            <tr>
              <td class="label">Email</td>
              <td><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td class="label">Phone</td>
              <td><a href="tel:${data.phone.replace(/\s/g, '')}">${data.phone}</a></td>
            </tr>
            <tr>
              <td class="label">Product/Service</td>
              <td>${data.product}</td>
            </tr>
            <tr>
              <td class="label">Message</td>
              <td>${data.message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>

          <p><strong>Please respond to this enquiry within 24 hours.</strong></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as EnquiryData;

    // Validate enquiry data
    const validation = validateEnquiryData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const data: EnquiryData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      product: body.product.trim(),
      message: body.message.trim(),
    };

    console.log('📧 Processing enquiry:', {
      name: data.name,
      email: data.email,
      product: data.product,
    });

    // Send customer confirmation email
    await sendEmail({
      to: data.email,
      subject: 'Thank you for contacting Sri Saradi Scientific',
      text: `Thank you for contacting Sri Saradi Scientific. Our team will get back to you within 24 hours with the required details.`,
      html: generateCustomerEmailHTML(data),
    });

    // Send company notification email
    await sendEmail({
      to: process.env.MAILGUN_COMPANY_EMAIL || 'sales@srisaradiscientific.com',
      subject: 'New Enquiry Received - Sri Saradi Scientific',
      text: `New enquiry from ${data.name}. Email: ${data.email}, Phone: ${data.phone}, Product: ${data.product}`,
      html: generateCompanyEmailHTML(data),
    });

    console.log('✓ Enquiry processed successfully');

    return NextResponse.json(
      { success: true, message: 'Enquiry received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('✗ Enquiry processing failed:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process enquiry. Please try again later.'
      },
      { status: 500 }
    );
  }
}
