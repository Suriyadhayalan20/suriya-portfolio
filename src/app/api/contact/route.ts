import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

        // 1️⃣ Email to YOU (admin notification)
        await sgMail.send({
            to: "suriyadhayalan2001@gmail.com",
            from: "suriyadhayalan2001@gmail.com",
            replyTo: email,
            subject: subject || "New Contact Message",
            html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
        });

        // 2️⃣ Auto-reply email to USER (Prithika)
        await sgMail.send({
            to: email,
            from: "suriyadhayalan2001@gmail.com",
            subject: "✨ I received your message!",
            html: `
    <div style="font-family:Arial, sans-serif; line-height:1.6; color:#333">
      <h2 style="color:#6C63FF;">Hi ${name} 👋</h2>

      <p>Thank you for reaching out through my portfolio website.</p>

      <p>I’ve received your message and will get back to you very soon.</p>

      <div style="background:#f5f5f5; padding:15px; border-radius:8px; margin-top:15px">
        <p><b>Your Message:</b></p>
        <p>${message}</p>
      </div>

      <br/>
      <p>Meanwhile, feel free to check my work:</p>
      <a href="https://suriyadhayalan-portfolio.vercel.app/" 
         style="display:inline-block; padding:10px 15px; background:#6C63FF; color:white; text-decoration:none; border-radius:5px;">
         Visit My Portfolio
      </a>

      <br/><br/>
      <p>Regards,<br/><b>Suriya Dhayalan</b></p>
    </div>
  `,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("SENDGRID ERROR:", error?.response?.body || error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
