# Mailgun Email System Setup Guide

## Project Structure
```
app/
├── api/
│   └── enquiry/
│       └── route.ts          (API endpoint for form submissions)
├── lib/
│   └── mailgun.ts            (Mailgun client utility)
└── ...

.env.local                     (Environment variables)
```

## Installation

Dependencies installed:
```bash
npm install mailgun.js form-data
```

## Environment Variables

Add these to `.env.local`:

```
MAILGUN_API_KEY=your_mailgun_api_key_here
MAILGUN_DOMAIN=mg.yourdomain.com
MAILGUN_FROM=Sri Saradi Scientific <noreply@yourdomain.com>
MAILGUN_COMPANY_EMAIL=sales@srisaradiscientific.com
```

### How to Get Mailgun Credentials:
1. Sign up at [mailgun.com](https://www.mailgun.com/)
2. Add your domain in Mailgun dashboard
3. Copy your API key from Settings > API Security
4. Use the domain provided (e.g., mg.yourdomain.com)
5. Configure sender email (must be verified in Mailgun)

## API Endpoint

**POST** `/api/enquiry`

### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 7407607444",
  "product": "Product Name",
  "message": "Enquiry message here"
}
```

### Response Success
```json
{
  "success": true,
  "message": "Enquiry received successfully"
}
```

### Response Error
```json
{
  "success": false,
  "errors": ["Email validation failed", "Name is required"]
}
```

## Features

✓ Email validation (format check)
✓ Phone number validation (10+ digits, basic format)
✓ Required field validation
✓ Two email templates:
  - Customer confirmation (auto-response)
  - Company notification (with full details)
✓ Clean HTML emails with inline styles
✓ Error handling with detailed logging
✓ TypeScript types for type safety
✓ Professional email formatting

## Usage in Frontend

### Example with Fetch
```typescript
async function submitEnquiry(formData: {
  name: string;
  email: string;
  phone: string;
  product: string;
  message: string;
}) {
  try {
    const response = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      alert('Thank you! We will contact you within 24 hours.');
    } else {
      alert('Validation errors: ' + data.errors.join(', '));
    }
  } catch (error) {
    alert('Failed to submit enquiry. Please try again.');
  }
}
```

### Example with React Form
```typescript
'use client';

import { useState } from 'react';

export function EnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Enquiry sent successfully!');
        setFormData({ name: '', email: '', phone: '', product: '', message: '' });
      } else {
        alert('Error: ' + data.errors.join(', '));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Product/Service"
        value={formData.product}
        onChange={(e) => setFormData({ ...formData, product: e.target.value })}
        required
      />
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Enquiry'}
      </button>
    </form>
  );
}
```

## Testing

Use curl to test the endpoint:

```bash
curl -X POST http://localhost:3000/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 7407607444",
    "product": "Test Product",
    "message": "Test message"
  }'
```

## Debugging

Check the console logs for:
- `✓ Email sent:` - Successful email send with message ID
- `✗ Email send failed:` - Email send error
- `📧 Processing enquiry:` - Enquiry received and being processed
- `✓ Enquiry processed successfully` - Complete success
- `✗ Enquiry processing failed:` - System error

## Notes

- Customer emails are sent from `MAILGUN_FROM` address
- Company emails are sent to `MAILGUN_COMPANY_EMAIL` (default: sales@srisaradiscientific.com)
- Both emails use professional HTML templates with inline CSS
- Response time is typically 2-5 seconds including email delivery
- All emails are logged to Mailgun dashboard for tracking
