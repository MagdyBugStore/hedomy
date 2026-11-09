import MerchantsAdmin from "@/components/admin/MerchantsAdmin";

export const metadata = { title: "التجار — لوحة التحكم", robots: { index: false } };

export default function MerchantsPage() {
  return (<><h1 className="mb-4 text-xl font-semibold">التجار وعدّاد واتساب</h1><MerchantsAdmin /></>);
}
