import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, topic, message } = body;

    if (!message || !email) {
      return NextResponse.json(
        { error: "Email and message are required fields." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || "vivekbarnaon@gmail.com";

    const { data, error } = await resend.emails.send({
      from: "Vivek Portfolio <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email,
      subject: `[Portfolio Inquiry] ${topic ? topic.toUpperCase() : "GENERAL"}: From ${name || email}`,
      html: `
        <div style="font-family: ui-monospace, Menlo, Monaco, monospace; max-width: 600px; padding: 24px; background: #0c0d12; color: #f8fafc; border: 1px solid #6366f1; border-radius: 12px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">
            <h2 style="color: #818cf8; margin: 0; font-size: 18px;">⚡ New Portfolio Message</h2>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 13px;">
            <tr>
              <td style="color: #94a3b8; padding: 4px 0; width: 100px;">SENDER:</td>
              <td style="color: #ffffff; font-weight: bold;">${name || "Anonymous / Visitor"}</td>
            </tr>
            <tr>
              <td style="color: #94a3b8; padding: 4px 0;">REPLY-TO:</td>
              <td style="color: #38bdf8;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="color: #94a3b8; padding: 4px 0;">TOPIC:</td>
              <td style="color: #fbbf24;">${topic ? topic.toUpperCase() : "GENERAL INQUIRY"}</td>
            </tr>
          </table>
          <div style="background: #13141f; padding: 16px; border-radius: 8px; border-left: 3px solid #6366f1; margin-top: 12px;">
            <p style="margin: 0; white-space: pre-wrap; color: #e2e8f0; font-size: 14px; line-height: 1.6;">${message}</p>
          </div>
          <p style="font-size: 11px; color: #64748b; margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 12px;">
            Sent directly from Vivek Kumar's Portfolio Contact Console.
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
