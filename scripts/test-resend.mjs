import fs from 'fs';
import path from 'path';

// 1. Manually parse .env.local without external dotenv dependency
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const apiKey = process.env.RESEND_API_KEY;
const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'sibasishchakraborty000@gmail.com';
const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

console.log('--- Testing Resend API Configuration ---');
console.log('Receiver:', receiverEmail);
console.log('From:', fromEmail);
console.log('API Key Present:', !!apiKey, apiKey ? `(${apiKey.slice(0, 7)}...)` : '');

if (!apiKey) {
  console.error('ERROR: RESEND_API_KEY is missing in .env.local!');
  process.exit(1);
}

async function runTest() {
  try {
    console.log('\nSending test dispatch payload to Resend API...');
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [receiverEmail],
        reply_to: 'test.client@example.com',
        subject: '[Test Transmission] Resend API Verification — Sibasish Portfolio',
        html: `
          <div style="font-family: monospace; background: #0D0D0D; color: #FFFFFF; padding: 24px; border-radius: 8px;">
            <h2 style="color: #FF5500; margin-top: 0;">[SYSTEM CHECK // 200 OK]</h2>
            <p>Resend API integration is functioning with 100% operational integrity.</p>
            <p><strong>Environment:</strong> Local Testing Pipeline</p>
            <p><strong>Recipient:</strong> ${receiverEmail}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
        `,
        text: 'System Check: Resend API integration is functioning with 100% operational integrity.',
      }),
    });

    const data = await response.json();
    console.log('Resend HTTP Status:', response.status);
    console.log('Resend Response Body:', data);

    if (response.ok) {
      console.log('\nSUCCESS! Email dispatch confirmed with Resend ID:', data.id);
    } else {
      console.error('\nFAILURE! Resend returned error:', data);
      process.exit(1);
    }
  } catch (err) {
    console.error('\nNetwork / Execution Error:', err);
    process.exit(1);
  }
}

runTest();
