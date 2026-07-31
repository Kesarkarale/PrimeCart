import { supabase } from "@/lib/supabase/client";

export default async function TestPage() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  console.log(data, error);

  return (
    <div>
      <h1>Supabase Connected</h1>
    </div>
  );
}
