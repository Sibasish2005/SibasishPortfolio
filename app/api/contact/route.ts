import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name / Identifier is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Objective & scope message is required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[Resend Error] RESEND_API_KEY is not configured in environment.');
      return NextResponse.json(
        { error: 'Email service configuration error.' },
        { status: 500 }
      );
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'sibasishchakraborty000@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();
    const nowIst = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(new Date());

    // 2. High-aesthetic HTML Email Template matching Portfolio identity
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0D0D0D; color: #FFFFFF; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #141414; border: 1px solid #262626; border-radius: 8px; overflow: hidden; }
          .header { background: #FF5500; padding: 20px 24px; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 900; color: #0D0D0D; letter-spacing: -0.5px; text-transform: uppercase; }
          .header p { margin: 4px 0 0 0; font-size: 11px; font-family: monospace; color: #0D0D0D; opacity: 0.85; text-transform: uppercase; }
          .content { padding: 28px 24px; }
          .field { margin-bottom: 20px; }
          .label { font-size: 11px; font-family: monospace; text-transform: uppercase; color: #FF5500; letter-spacing: 1px; margin-bottom: 6px; }
          .value { font-size: 15px; color: #F4F4F2; background: #0D0D0D; padding: 12px 14px; border: 1px solid #262626; border-radius: 4px; }
          .message-box { white-space: pre-wrap; line-height: 1.6; font-size: 14px; color: #E5E5E5; background: #0D0D0D; padding: 16px; border-left: 3px solid #FF5500; border-radius: 4px; }
          .footer { padding: 18px 24px; background: #0A0A0A; border-top: 1px solid #222222; font-size: 11px; font-family: monospace; color: #737373; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>[ DISPATCH // PORTFOLIO INQUIRY ]</h1>
            <p>sibasishdev.in // Agartala Technical Runtime</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">01 // CLIENT IDENTIFIER</div>
              <div class="value">${cleanName}</div>
            </div>
            <div class="field">
              <div class="label">02 // CLIENT EMAIL &amp; REPLY-TO</div>
              <div class="value"><a href="mailto:${cleanEmail}" style="color: #FF5500; text-decoration: none;">${cleanEmail}</a></div>
            </div>
            <div class="field">
              <div class="label">03 // TRANSMISSION TIMESTAMP</div>
              <div class="value" style="font-family: monospace; font-size: 12px;">${nowIst} (IST)</div>
            </div>
            <div class="field">
              <div class="label">04 // OBJECTIVE &amp; SCOPE</div>
              <div class="message-box">${cleanMessage}</div>
            </div>
          </div>
          <div class="footer">
            <span>TRANSMITTED FROM SIBASISHDEV.IN</span>
            <span>AGARTALA, TRIPURA 799001</span>
          </div>
        </div>
      </body>
      </html>
    `;

    // 3. Dispatch to Resend REST API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [receiverEmail],
        reply_to: cleanEmail,
        subject: `[Portfolio Inquiry] ${cleanName} — sibasishdev.in`,
        html: htmlContent,
        text: `Portfolio Inquiry from ${cleanName} (${cleanEmail})\n\nTime: ${nowIst}\n\nMessage:\n${cleanMessage}`,
      }),
    });

    const resData = await response.json();

    if (!response.ok) {
      console.error('[Resend API Error Response]:', resData);
      return NextResponse.json(
        { error: resData.message || 'Resend failed to deliver email.' },
        { status: response.status }
      );
    }

    console.log('[Resend Success]: Email sent successfully with ID:', resData.id);

    return NextResponse.json(
      {
        success: true,
        id: resData.id,
        message: 'Your transmission has been confirmed. Sibasish will respond shortly.',
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('[Contact API Fatal Error]:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error.';
    return NextResponse.json(
      { error: `Internal server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
