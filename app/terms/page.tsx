import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

export default function TermsPage() {
  redirect(`/${defaultLocale}/terms`);
}
