import { redirect } from "next/navigation";

export default function Page() {
  redirect("/notices?tab=orders");
}
