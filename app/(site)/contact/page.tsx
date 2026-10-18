import ContactForm from "@/components/contact/ContactForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Hire Advik Gupta for a website, web app, backend or custom factory software. Tell me what you're building and I'll get back to you within a day or two.",
  path: "/contact",
});

export default function Page() {
  return <ContactForm />;
}
