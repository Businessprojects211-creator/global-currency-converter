import { redirect } from "next/navigation";

export const metadata = { robots: { index: false, follow: true } };
export default async function PairRedirect({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params;
  const match = /^([a-z]{3})-to-([a-z]{3})$/.exec(pair.toLowerCase());
  if (!match) redirect("/");
  redirect(`/convert/${match?.[1]}/${match?.[2]}`);
}
