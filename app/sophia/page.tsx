import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soph, tengo una pregunta",
  description: "Una invitación especial para Soph.",
  robots: { index: false, follow: false },
};

export default function SophiaInvitationPage() {
  return (
    <iframe
      title="Invitación para Soph"
      src="/sophia-invitacion/index.html"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        border: 0,
      }}
    />
  );
}
