import Link from "next/link";
export default function NotFound() {
  return (<div className="py-32 text-center"><p className="text-muted">المنتج غير موجود.</p><Link href="/shop" className="mt-4 inline-block underline">العودة للمتجر</Link></div>);
}
