import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-pastel-ink">お問い合わせ</h1>
      <p className="text-pastel-ink/80">
        ご質問・ご要望、または問題の誤り・誤字脱字などの報告はこちらからお送りください。
      </p>
      <ContactForm />
    </div>
  );
}
