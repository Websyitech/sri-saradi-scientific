import nodemailer from 'nodemailer';

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.zoho.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // false for 587, true for 465
  requireTLS: true, // Required for Zoho
  auth: {
    user: process.env.SMTP_USER || 'info@srisaradiscientific.com',
    pass: process.env.SMTP_PASSWORD || '',
  },
  // Additional Zoho-specific settings
  tls: {
    rejectUnauthorized: false
  }
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Interface for email options
interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

// Interface for contact form data
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  pageUrl?: string;
}

// Send email function
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const mailOptions = {
      from: {
        name: process.env.SMTP_FROM_NAME || 'Sri Saradi Scientific',
        address: process.env.SMTP_FROM_EMAIL || 'info@srisaradiscientific.com'
      },
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Send contact form notification
export async function sendContactFormNotification(data: ContactFormData): Promise<boolean> {
  const subject = `New Contact Form Message${data.subject ? `: ${data.subject}` : ''}`;
  
  const html = `
    <h2>New Contact Form Message</h2>
    <p><strong>From:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
    ${data.pageUrl ? `<p><strong>Page URL:</strong> <a href="${data.pageUrl}">${data.pageUrl}</a></p>` : ''}
    <p><strong>Message:</strong></p>
    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
      ${data.message.replace(/\n/g, '<br>')}
    </div>
    <hr>
    <p style="font-size: 12px; color: #666;">
      This message was sent from the Sri Saradi Scientific website contact form.
    </p>
  `;

  const text = `
    New Contact Form Message

    From: ${data.name}
    Email: ${data.email}
    ${data.phone ? `Phone: ${data.phone}` : ''}
    ${data.subject ? `Subject: ${data.subject}` : ''}
    ${data.pageUrl ? `Page URL: ${data.pageUrl}` : ''}

    Message:
    ${data.message}

    ---
    This message was sent from the Sri Saradi Scientific website contact form.
  `;

  return sendEmail({
    to: process.env.SMTP_FROM_EMAIL || 'info@srisaradiscientific.com',
    subject,
    text,
    html
  });
}

// Send confirmation email to customer
export async function sendContactConfirmation(data: ContactFormData): Promise<boolean> {
  const subject = 'Thank you for contacting Sri Saradi Scientific';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2D2B7F;">Thank you for your message!</h2>
      
      <p>Dear ${data.name},</p>
      
      <p>Thank you for contacting Sri Saradi Scientific. We have received your message and will respond as soon as possible.</p>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #2D2B7F;">Your Message Details:</h3>
        ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <div style="background: white; padding: 15px; border-radius: 3px;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
      </div>
      
      <p>Our team typically responds within 24 hours during business hours (Monday - Friday, 9:00 AM - 6:00 PM IST).</p>
      
      <p>If you have any urgent inquiries, please feel free to call us at <a href="tel:+919742443809">+91 97424 43809</a>.</p>
      
      <p>Best regards,<br>
      <strong>Sri Saradi Scientific Team</strong></p>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      
      <div style="font-size: 12px; color: #666; text-align: center;">
        <p>Sri Saradi Scientific<br>
        Hyderabad, Telangana, India<br>
        Email: info@srisaradiscientific.com<br>
        Phone: +91 97424 43809</p>
      </div>
    </div>
  `;

  const text = `
    Thank you for your message!

    Dear ${data.name},

    Thank you for contacting Sri Saradi Scientific. We have received your message and will respond as soon as possible.

    Your Message Details:
    ${data.subject ? `Subject: ${data.subject}` : ''}
    Message: ${data.message}

    Our team typically responds within 24 hours during business hours (Monday - Friday, 9:00 AM - 6:00 PM IST).

    If you have any urgent inquiries, please feel free to call us at +91 97424 43809.

    Best regards,
    Sri Saradi Scientific Team

    ---
    Sri Saradi Scientific
    Hyderabad, Telangana, India
    Email: info@srisaradiscientific.com
    Phone: +91 97424 43809
  `;

  return sendEmail({
    to: data.email,
    subject,
    text,
    html
  });
}

// Interface for quote item data
interface QuoteItemData {
  productId?: string;
  sku?: string;
  name: string;
  quantity: number;
}

// Interface for quote form data
interface QuoteFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  items?: QuoteItemData[];
  orderId: string;
  pageUrl?: string;
}

// Send quote request notification to admin
export async function sendQuoteNotification(data: QuoteFormData): Promise<boolean> {
  const subject = `New Quote Request - ${data.orderId}`;
  
  const itemsHtml = data.items && data.items.length > 0 
    ? `
      <h3>Requested Items:</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">SKU</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${data.items.map(item => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.sku || 'N/A'}</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` 
    : '';

  const html = `
    <h2>New Quote Request</h2>
    <p><strong>Order ID:</strong> ${data.orderId}</p>
    <p><strong>From:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
    ${data.pageUrl ? `<p><strong>Page URL:</strong> <a href="${data.pageUrl}">${data.pageUrl}</a></p>` : ''}
    
    ${itemsHtml}
    
    ${data.notes ? `
      <h3>Additional Notes:</h3>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${data.notes.replace(/\n/g, '<br>')}
      </div>
    ` : ''}
    
    <hr>
    <p style="font-size: 12px; color: #666;">
      This quote request was submitted from the Sri Saradi Scientific website.
    </p>
  `;

  const text = `
    New Quote Request

    Order ID: ${data.orderId}
    From: ${data.name}
    Email: ${data.email}
    ${data.phone ? `Phone: ${data.phone}` : ''}
    ${data.company ? `Company: ${data.company}` : ''}
    ${data.pageUrl ? `Page URL: ${data.pageUrl}` : ''}

    ${data.items && data.items.length > 0 ? `
    Requested Items:
    ${data.items.map(item => `- ${item.name} (SKU: ${item.sku || 'N/A'}) - Qty: ${item.quantity}`).join('\n')}
    ` : ''}

    ${data.notes ? `
    Additional Notes:
    ${data.notes}
    ` : ''}

    ---
    This quote request was submitted from the Sri Saradi Scientific website.
  `;

  return sendEmail({
    to: process.env.SMTP_FROM_EMAIL || 'info@srisaradiscientific.com',
    subject,
    text,
    html
  });
}

// Send quote confirmation email to customer
export async function sendQuoteConfirmation(data: QuoteFormData): Promise<boolean> {
  const subject = `Quote Request Confirmation - ${data.orderId}`;
  
  const itemsHtml = data.items && data.items.length > 0 
    ? `
      <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #2D2B7F;">Your Requested Items:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #e9e9e9;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">SKU</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Quantity</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map(item => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.sku || 'N/A'}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` 
    : '';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2D2B7F;">Quote Request Received!</h2>
      
      <p>Dear ${data.name},</p>
      
      <p>Thank you for your quote request. We have received your inquiry and will prepare a detailed quotation for you.</p>
      
      <div style="background: #f0f8ff; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #2D2B7F;">
        <h3 style="margin-top: 0; color: #2D2B7F;">Quote Request Details:</h3>
        <p><strong>Order ID:</strong> ${data.orderId}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        ${data.phone ? `<p><strong>Contact Phone:</strong> ${data.phone}</p>` : ''}
      </div>
      
      ${itemsHtml}
      
      ${data.notes ? `
        <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2D2B7F;">Your Notes:</h3>
          <div style="background: white; padding: 15px; border-radius: 3px;">
            ${data.notes.replace(/\n/g, '<br>')}
          </div>
        </div>
      ` : ''}
      
      <p>Our sales team will review your requirements and send you a detailed quotation within 24 hours during business hours (Monday - Friday, 9:00 AM - 6:00 PM IST).</p>
      
      <p>If you have any urgent questions or need to modify your request, please feel free to contact us:</p>
      <ul>
        <li>Email: <a href="mailto:info@srisaradiscientific.com">info@srisaradiscientific.com</a></li>
        <li>Phone: <a href="tel:+919742443809">+91 97424 43809</a></li>
      </ul>
      
      <p>Thank you for choosing Sri Saradi Scientific!</p>
      
      <p>Best regards,<br>
      <strong>Sri Saradi Scientific Sales Team</strong></p>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      
      <div style="font-size: 12px; color: #666; text-align: center;">
        <p>Sri Saradi Scientific<br>
        Hyderabad, Telangana, India<br>
        Email: info@srisaradiscientific.com<br>
        Phone: +91 97424 43809</p>
      </div>
    </div>
  `;

  const text = `
    Quote Request Received!

    Dear ${data.name},

    Thank you for your quote request. We have received your inquiry and will prepare a detailed quotation for you.

    Quote Request Details:
    Order ID: ${data.orderId}
    ${data.company ? `Company: ${data.company}` : ''}
    ${data.phone ? `Contact Phone: ${data.phone}` : ''}

    ${data.items && data.items.length > 0 ? `
    Your Requested Items:
    ${data.items.map(item => `- ${item.name} (SKU: ${item.sku || 'N/A'}) - Qty: ${item.quantity}`).join('\n')}
    ` : ''}

    ${data.notes ? `
    Your Notes:
    ${data.notes}
    ` : ''}

    Our sales team will review your requirements and send you a detailed quotation within 24 hours during business hours (Monday - Friday, 9:00 AM - 6:00 PM IST).

    If you have any urgent questions or need to modify your request, please feel free to contact us:
    - Email: info@srisaradiscientific.com
    - Phone: +91 97424 43809

    Thank you for choosing Sri Saradi Scientific!

    Best regards,
    Sri Saradi Scientific Sales Team

    ---
    Sri Saradi Scientific
    Hyderabad, Telangana, India
    Email: info@srisaradiscientific.com
    Phone: +91 97424 43809
  `;

  return sendEmail({
    to: data.email,
    subject,
    text,
    html
  });
}

// Verify SMTP connection
export async function verifyEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('SMTP connection verification failed:', error);
    return false;
  }
}