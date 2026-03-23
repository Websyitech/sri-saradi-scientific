import Mailgun from 'mailgun.js';
import FormData from 'form-data';

const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
});

interface EmailParams {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail({ to, subject, text, html }: EmailParams) {
  try {
    const domain = process.env.MAILGUN_DOMAIN;
    const from = process.env.MAILGUN_FROM;

    if (!domain || !from) {
      throw new Error('Mailgun configuration is missing');
    }

    const message = {
      from,
      to,
      subject,
      text,
      html,
    };

    const result = await mg.messages.create(domain, message);
    console.log('✓ Email sent:', result.id);
    return result;
  } catch (error) {
    console.error('✗ Email send failed:', error);
    throw error;
  }
}
