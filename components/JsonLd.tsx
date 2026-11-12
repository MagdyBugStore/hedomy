import { ldScript } from "@/lib/site";

/** Structured data for search engines and AI answer engines. */
export default function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript(data) }} />;
}
