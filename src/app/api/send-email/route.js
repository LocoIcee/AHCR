import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY ?? '');
const CONTACT_RECIPIENT = process.env.CONTACT_RECIPIENT_EMAIL ?? 'almosthomecaninerescue@gmail.com';
const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL;
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET_KEY;
const HCAPTCHA_VERIFY_URL = 'https://hcaptcha.com/siteverify';

const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

export async function POST(request) {
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY environment variable.');
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 });
  }

  if (!FROM_ADDRESS) {
    console.error('Missing RESEND_FROM_EMAIL environment variable.');
    return NextResponse.json({ error: 'Email service sender not configured.' }, { status: 500 });
  }

  if (!HCAPTCHA_SECRET) {
    console.error('Missing HCAPTCHA_SECRET_KEY environment variable.');
    return NextResponse.json({ error: 'Captcha service not configured.' }, { status: 500 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const { name, email, phone, subject, message, hCaptchaToken } = payload ?? {};

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  if (!hCaptchaToken) {
    return NextResponse.json({ error: 'Captcha token missing.' }, { status: 400 });
  }

  let captchaVerification;
  try {
    const verifyResponse = await fetch(HCAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        response: hCaptchaToken,
        secret: HCAPTCHA_SECRET,
      }),
    });

    if (!verifyResponse.ok) {
      console.error('hCaptcha verification HTTP error', verifyResponse.status);
      return NextResponse.json({ error: 'Captcha verification failed.' }, { status: 500 });
    }

    captchaVerification = await verifyResponse.json();
  } catch (error) {
    console.error('hCaptcha verification failed', error);
    return NextResponse.json({ error: 'Captcha verification failed.' }, { status: 500 });
  }

  if (!captchaVerification?.success) {
    return NextResponse.json({ error: 'Captcha verification failed.' }, { status: 400 });
  }

  const safeSubject = subject.trim() || 'Contact Form Submission';
  const submissionSummary = {
    name,
    email,
    phone: phone?.trim() || 'N/A',
    subject: safeSubject,
    message,
  };

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `AHCR Contact Form: ${safeSubject}`,
      text: `New contact form submission from the AHCR website.\n\n` +
        `Name: ${submissionSummary.name}\n` +
        `Email: ${submissionSummary.email}\n` +
        `Phone: ${submissionSummary.phone}\n` +
        `Subject: ${submissionSummary.subject}\n\n` +
        'Message:\n' +
        `${submissionSummary.message}`,
      html: `
        <div>
          <p><strong>Name:</strong> ${submissionSummary.name}</p>
          <p><strong>Email:</strong> ${submissionSummary.email}</p>
          <p><strong>Phone:</strong> ${submissionSummary.phone}</p>
          <p><strong>Subject:</strong> ${submissionSummary.subject}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${submissionSummary.message.replace(/\n/g, '<br />')}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send contact form email', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
