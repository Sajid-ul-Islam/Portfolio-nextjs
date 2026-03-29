import ContactClient from "../components/vscode/ContactClient";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Raj Savaliya. Reach out for collaborations, opportunities, or just to say hello.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
