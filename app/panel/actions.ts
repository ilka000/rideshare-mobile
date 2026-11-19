"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ndryshoOren, publikoUdhetimin } from "@/lib/lejet";

export async function ruajOren(formData: FormData) {
  let mesazh: string;
  try {
    mesazh = await ndryshoOren(String(formData.get("id") ?? ""), String(formData.get("ora") ?? ""));
  } catch {
    mesazh = "databaza";
  }
  if (mesazh === "ruajtur") {
    revalidatePath("/");
    revalidatePath("/udhetimi/2");
  }
  redirect("/panel?m=" + mesazh);
}

export async function publikoUdhetimAction(formData: FormData) {
  let mesazh: string;
  try {
    mesazh = await publikoUdhetimin({
      nisja: String(formData.get("nisja") ?? ""),
      destinacioni: String(formData.get("destinacioni") ?? ""),
      ora: String(formData.get("ora") ?? ""),
      vendtakimi: String(formData.get("vendtakimi") ?? ""),
      vende: String(formData.get("vende") ?? ""),
    });
  } catch {
    mesazh = "databaza";
  }
  if (mesazh === "publikuar") revalidatePath("/");
  redirect("/panel?m=" + mesazh);
}
