import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { userName, userPhone, userEmail, message, propertyTitle, propertyLocation, agentName, agentEmail } = await req.json();

    // Validate required fields
    if (!agentEmail || !userName || !userPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to agent
    await transporter.sendMail({
      from: `"GS Associations Enquiry" <${process.env.SMTP_USER}>`,
      to: agentEmail,
      replyTo: userEmail || undefined,
      subject: `New Property Enquiry — ${propertyTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #0f2551; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Property Enquiry</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 14px;">GS Associations — Property Advisory</p>
          </div>

          <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">
            <p style="font-size: 15px; color: #374151;">Hi <strong>${agentName}</strong>,</p>
            <p style="font-size: 15px; color: #374151;">You have received a new enquiry for the following property:</p>

            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px 20px; margin: 20px 0;">
              <p style="margin: 0 0 4px; font-weight: 600; font-size: 16px; color: #0f2551;">${propertyTitle}</p>
              <p style="margin: 0; font-size: 13px; color: #6b7280;">Location: ${propertyLocation}</p>
            </div>

            <h2 style="font-size: 15px; font-weight: 600; color: #374151; margin: 24px 0 12px;">Prospect Details</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 120px;">Name</td>
                <td style="padding: 8px 0; font-weight: 500; color: #111827;">${userName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Phone</td>
                <td style="padding: 8px 0; font-weight: 500; color: #111827;"><a href="tel:${userPhone}" style="color: #0f2551;">${userPhone}</a></td>
              </tr>
              ${userEmail ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Email</td>
                <td style="padding: 8px 0; font-weight: 500; color: #111827;"><a href="mailto:${userEmail}" style="color: #0f2551;">${userEmail}</a></td>
              </tr>` : ''}
              ${message ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Message</td>
                <td style="padding: 8px 0; font-weight: 500; color: #111827;">${message}</td>
              </tr>` : ''}
            </table>

            <div style="margin-top: 28px; padding: 16px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px;">
              <p style="margin: 0; font-size: 13px; color: #92400e;"><strong>Action Required:</strong> Please follow up within 2 hours for the best conversion rate.</p>
            </div>

            <p style="font-size: 12px; color: #9ca3af; margin-top: 24px;">
              This enquiry was submitted via the GS Associations property portal.
            </p>
          </div>
        </div>
      `,
    });

    // Confirmation email to user (if they have an email)
    if (userEmail) {
      await transporter.sendMail({
        from: `"GS Associations" <${process.env.SMTP_USER}>`,
        to: userEmail,
        subject: `We've received your enquiry — ${propertyTitle}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
            <div style="background: #0f2551; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 22px;">Enquiry Confirmed</h1>
              <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 14px;">GS Associations — Premium Real Estate</p>
            </div>
            <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">
              <p style="font-size: 15px; color: #374151;">Hi <strong>${userName.split(' ')[0]}</strong>,</p>
              <p style="font-size: 15px; color: #374151;">Thank you for your interest! We've forwarded your enquiry about <strong>${propertyTitle}</strong> to <strong>${agentName}</strong>, who will get in touch with you within 2 hours.</p>

              <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px 20px; margin: 20px 0;">
                <p style="margin: 0 0 4px; font-weight: 600; font-size: 15px; color: #0f2551;">${propertyTitle}</p>
                <p style="margin: 0; font-size: 13px; color: #6b7280;">Location: ${propertyLocation}</p>
              </div>

              <p style="font-size: 13px; color: #6b7280;">If you have any urgent questions, you can also call us directly.</p>
              <p style="font-size: 12px; color: #9ca3af; margin-top: 28px;">© GS Associates · Chennai's Premier Financial & Loan Advisory · gopi.thamba@gmail.com · +91 90031 67674</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Enquiry email error:', error);
    return NextResponse.json({ error: 'Failed to send enquiry email' }, { status: 500 });
  }
}
