"use client";

import { FormEvent, useState } from "react";

type Language = "en" | "es";

const copy = {
  en: {
    title: "Send a message",
    intro: "This local preview saves your message on this computer only. It does not send email or start marketing messages.",
    name: "Your name", email: "Email address", organization: "Organization (optional)", topic: "Reason for contacting", message: "Message",
    choose: "Choose one", opportunity: "Job opportunity", networking: "Professional networking", other: "Other",
    consent: "I understand this message is stored locally on this computer so Juan can review it. It is not emailed or used for marketing.",
    send: "Save message locally", sending: "Saving…", success: "Saved in the local inbox. No email was sent.",
    failure: "The local inbox is unavailable. You can contact Juan through LinkedIn instead.",
    unavailable: "For a public contact route, connect and configure a private backend and email provider first. For now, use LinkedIn.",
    honeypot: "Leave this field empty",
  },
  es: {
    title: "Enviar un mensaje",
    intro: "Esta vista previa local guarda el mensaje solo en este computador. No envía correos ni inicia comunicaciones de marketing.",
    name: "Tu nombre", email: "Correo electrónico", organization: "Organización (opcional)", topic: "Motivo del contacto", message: "Mensaje",
    choose: "Elige una opción", opportunity: "Oportunidad laboral", networking: "Contacto profesional", other: "Otro",
    consent: "Entiendo que el mensaje se guarda localmente en este computador para que Juan lo revise. No se envía por correo ni se usa para marketing.",
    send: "Guardar mensaje localmente", sending: "Guardando…", success: "Guardado en la bandeja local. No se envió ningún correo.",
    failure: "La bandeja local no está disponible. Puedes contactar a Juan por LinkedIn.",
    unavailable: "Para habilitar el contacto público, primero hay que configurar un backend privado y un proveedor de correo. Por ahora, usa LinkedIn.",
    honeypot: "Deja este campo vacío",
  },
} as const;

export default function ContactForm({ language }: { language: Language }) {
  const t = copy[language];
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  if (process.env.NODE_ENV === "production") return <p className="contact-form-unavailable">{t.unavailable}</p>;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setNotice("");
    setError("");
    const form = event.currentTarget;
    const fields = new FormData(form);
    const payload = {
      name: fields.get("name"), email: fields.get("email"), organization: fields.get("organization"),
      topic: fields.get("topic"), message: fields.get("message"), consent: fields.get("consent") === "on",
      website: fields.get("website"),
    };
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || t.failure);
      form.reset();
      setNotice(t.success);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : t.failure);
    } finally {
      setPending(false);
    }
  }

  return <div className="contact-form-wrap">
    <div className="contact-form-heading"><h3>{t.title}</h3><p>{t.intro}</p></div>
    <form className="contact-form" onSubmit={submit}>
      <div className="contact-honeypot" aria-hidden="true"><label>{t.honeypot}<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="contact-form-grid">
        <label>{t.name}<input name="name" required maxLength={80} autoComplete="name" /></label>
        <label>{t.email}<input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
        <label>{t.organization}<input name="organization" maxLength={120} autoComplete="organization" /></label>
        <label>{t.topic}<select name="topic" required defaultValue=""><option value="" disabled>{t.choose}</option><option value="job-opportunity">{t.opportunity}</option><option value="professional-networking">{t.networking}</option><option value="other">{t.other}</option></select></label>
      </div>
      <label className="contact-message-field">{t.message}<textarea name="message" required minLength={10} maxLength={3000} rows={5} /></label>
      <label className="contact-consent"><input type="checkbox" name="consent" required /><span>{t.consent}</span></label>
      <button className="button-primary" type="submit" disabled={pending}>{pending ? t.sending : t.send}<span aria-hidden="true"> ↗</span></button>
      <p className="contact-form-status" role={error ? "alert" : "status"} aria-live={error ? "assertive" : "polite"}>{error || notice}</p>
    </form>
  </div>;
}
