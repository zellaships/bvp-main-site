import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: /api/newsletter-signup
 *
 * Proxies newsletter form submissions to Action Network.
 * Uses the same form as advocate signups but with simplified data.
 */

const ACTION_NETWORK_ENDPOINT =
  'https://actionnetwork.org/api/v2/forms/e454170c-9cfe-47df-bed7-7a5ece7c7bd9/submissions';

// Basic HTML sanitization to prevent XSS
function sanitize(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

interface NewsletterFormData {
  firstName: string;
  lastName: string;
  email: string;
  zipCode?: string;
  substack?: boolean;
}

function buildPayload(formData: NewsletterFormData) {
  const clean = {
    firstName: sanitize(formData.firstName),
    lastName: sanitize(formData.lastName),
    email: sanitize(formData.email),
    zipCode: sanitize(formData.zipCode),
  };

  const tags = ['Website Signup', 'Newsletter'];
  if (formData.substack) {
    tags.push('Substack Interest');
  }

  return {
    person: {
      given_name: clean.firstName,
      family_name: clean.lastName,
      email_addresses: [{ address: clean.email }],
      postal_addresses: clean.zipCode ? [{ postal_code: clean.zipCode }] : [],
      custom_fields: {
        signup_source: 'Newsletter Strip',
        substack_interest: formData.substack ? 'Yes' : 'No',
      },
    },
    add_tags: tags,
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData: NewsletterFormData = await request.json();

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const payload = buildPayload(formData);

    const response = await fetch(ACTION_NETWORK_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OSDI-API-Token': process.env.ACTION_NETWORK_API_KEY || '',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error('Action Network error:', responseText);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
