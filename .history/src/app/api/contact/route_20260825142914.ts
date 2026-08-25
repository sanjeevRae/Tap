import { NextResponse } from "next/server";

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      const missing = [
        !serviceId && "EMAILJS_SERVICE_ID",
        !templateId && "EMAILJS_TEMPLATE_ID",
        !publicKey && "EMAILJS_PUBLIC_KEY",
        !privateKey && "EMAILJS_PRIVATE_KEY",
      ].filter(Boolean);

      console.error("Email service misconfigured. Missing env vars:", missing);

      return NextResponse.json(
        {
          error:
            "Email service is not configured on the server. Missing: " +
            missing.join(", "),
        },
        { status: 500 }
      );
    }

    const emailResponse = await fetch(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          name,
          email,
          message,
          from_name: name,
          from_email: email,
        },
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("EmailJS request failed", {
        status: emailResponse.status,
        error: errorText,
      });

      return NextResponse.json(
        {
          error:
            errorText ||
            `Email service rejected the request with status ${emailResponse.status}.`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send request." },
      { status: 500 }
    );
  }
}
