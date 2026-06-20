import ContactClient from "../components/vscode/ContactClient";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Sajid Islam. Reach out for collaborations, analytics opportunities, or dashboard building.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
