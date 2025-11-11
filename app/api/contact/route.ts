import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  role: z.string().min(1),
  interest: z.string().min(1),
  message: z.string().min(10).max(600),
});

const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_EMAIL"] as const;

const validateEnv = () => {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Faltan variables de entorno para el envío de correos: ${missing.join(", ")}`);
  }
};

const getTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

export async function POST(request: Request) {
  try {
    validateEnv();
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Formato inválido" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Datos inválidos", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, role, interest, message } = parsed.data;

  const mailSubject = `Quiero hablar con Pupilo - ${name}`;
  const mailBody = [
    `Nombre completo: ${name}`,
    `Correo: ${email}`,
    `Rol principal: ${role}`,
    `Interés principal: ${interest}`,
    "",
    "Mensaje:",
    message,
  ].join("\n");

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: mailSubject,
      text: mailBody,
    });

    return NextResponse.json({ message: "Mensaje enviado" });
  } catch (error) {
    console.error("Error enviando correo de contacto:", error);
    return NextResponse.json({ message: "No se pudo enviar el mensaje" }, { status: 500 });
  }
}
