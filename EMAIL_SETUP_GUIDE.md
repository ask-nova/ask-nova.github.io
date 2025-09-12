# Email Setup Guide for Ask-Nova Forms

This guide explains how to complete the setup for sending form submissions to **ludovic.petit@exeevo.com** and **paven.rai@exeevo.com**.

## Current Implementation

The website now includes:

✅ **Enhanced script.js** - Form handling with email functionality  
✅ **EmailJS integration** - Added to all HTML pages  
✅ **Fallback email method** - Using mailto links if EmailJS fails  
✅ **Form detection** - Automatic detection of all form types  
✅ **Data collection** - Comprehensive form data extraction  

## EmailJS Setup (Recommended)

To enable automated email sending without opening email clients:

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create a free account
3. Verify your email

### Step 2: Configure EmailJS
1. **Add Email Service:**
   - Go to Email Services → Add New Service
   - Choose your email provider (Gmail, Outlook, etc.)
   - Connect your email account
   - Note the **Service ID**

2. **Create Email Template:**
   - Go to Email Templates → Create New Template  
   - Use this template structure:
   ```
   Subject: {{subject}}
   
   New Nova Demo Request - {{form_type}}
   
   Contact Information:
   - Name: {{from_name}}
   - Email: {{from_email}}
   - Company: {{company}}
   - Role: {{role}}
   - Phone: {{phone}}
   
   Message/Interest:
   {{interest}}
   
   Request Details:
   - Form Type: {{form_type}}
   - Page: {{page_title}}
   - URL: {{page_url}}
   - Timestamp: {{timestamp}}
   
   Please follow up within 24 hours.
   ```
   - Set the "To Email" field to: `ludovic.petit@exeevo.com,paven.rai@exeevo.com`
   - Note the **Template ID**

3. **Get Public Key:**
   - Go to Account → General
   - Copy your **Public Key**

### Step 3: Update Configuration
In `script.js`, update these values (around line 345-347):
```javascript
const SERVICE_ID = 'your_service_id_here';
const TEMPLATE_ID = 'your_template_id_here';  
const PUBLIC_KEY = 'your_public_key_here';
```

## Current Fallback Method

If EmailJS is not configured, the system will:
1. Generate a formatted email with all form data
2. Open the user's default email client
3. Pre-populate recipient addresses and content
4. User clicks "Send" to complete the email

## Form Coverage

The script handles forms from these pages:
- **index.html** - Main contact form (General Contact)
- **nova-pharma-reps.html** - Pharma reps demo request
- **nova-msl.html** - MSL demo request  
- **nova-med-devices.html** - Medical devices demo request
- **nova-kam.html** - Key Account Manager demo request
- **nova-consumer-health.html** - Consumer health demo request
- **nova-animal-health.html** - Animal health demo request

## Email Content

Each form submission includes:
- **Contact Details:** Name, email, company, role, phone
- **Form Context:** Which page/form was submitted
- **User Interest:** Message or specific requirements
- **Technical Info:** Timestamp, page URL, user agent
- **Form Type:** Clear categorization for follow-up

## Testing

To test the forms:
1. Fill out any contact form on the website
2. Submit the form
3. If EmailJS is configured: Email sent automatically
4. If EmailJS not configured: Email client opens with pre-filled content

## Troubleshooting

**Forms not working?**
- Check browser console for JavaScript errors
- Verify EmailJS credentials in script.js
- Ensure internet connection for EmailJS service

**EmailJS failing?**
- System automatically falls back to mailto method
- Users' email clients will open with pre-filled content
- They need to click "Send" manually

**Missing form data?**
- All form fields are automatically detected
- Check that form inputs have proper `name` attributes
- Verify form submission in browser developer tools

## Next Steps

1. **Set up EmailJS account** (recommended for seamless experience)
2. **Update script.js** with your EmailJS credentials
3. **Test form submissions** to ensure proper delivery
4. **Monitor email delivery** to both recipient addresses

The current implementation provides immediate functionality with the mailto fallback, and can be upgraded to full automation by configuring EmailJS.