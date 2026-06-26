import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

const LOCAL_STORAGE_PATH = path.join(process.cwd(), "src", "data", "visitor_count.json");

// Helper function to read local fallback count
function getLocalCount(): number {
  try {
    if (fs.existsSync(LOCAL_STORAGE_PATH)) {
      const fileData = fs.readFileSync(LOCAL_STORAGE_PATH, "utf8");
      const parsed = JSON.parse(fileData);
      return typeof parsed.count === "number" ? parsed.count : 10425;
    }
  } catch (err) {
    console.error("Failed to read local visitor count fallback:", err);
  }
  return 10425;
}

// Helper function to write local fallback count
function setLocalCount(count: number): void {
  try {
    const dir = path.dirname(LOCAL_STORAGE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_STORAGE_PATH, JSON.stringify({ count }, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write local visitor count fallback:", err);
  }
}

export async function GET() {
  try {
    // 1. Try fetching from Supabase visitor_stats table
    const { data, error } = await supabase
      .from("visitor_stats")
      .select("count")
      .eq("counter_name", "total_visitors")
      .maybeSingle();

    if (error || !data) {
      console.warn("Supabase fetch failed (table may not exist yet), falling back to local file:", error?.message);
      const count = getLocalCount();
      return NextResponse.json({ count, source: "local" });
    }

    return NextResponse.json({ count: Number(data.count), source: "database" });
  } catch (err) {
    console.error("Error in GET /api/visitor-count:", err);
    const count = getLocalCount();
    return NextResponse.json({ count, source: "local_error" });
  }
}

export async function POST() {
  try {
    // 1. Try incrementing in Supabase
    // Select first
    const { data, error } = await supabase
      .from("visitor_stats")
      .select("count")
      .eq("counter_name", "total_visitors")
      .maybeSingle();

    if (error || !data) {
      console.warn("Supabase fetch for increment failed, falling back to local file:", error?.message);
      const count = getLocalCount() + 1;
      setLocalCount(count);
      return NextResponse.json({ count, source: "local" });
    }

    const currentCount = Number(data.count);
    const newCount = currentCount + 1;

    const { error: updateError } = await supabase
      .from("visitor_stats")
      .update({ count: newCount, updated_at: new Date().toISOString() })
      .eq("counter_name", "total_visitors");

    if (updateError) {
      console.error("Supabase update failed, falling back to local file:", updateError.message);
      const count = getLocalCount() + 1;
      setLocalCount(count);
      return NextResponse.json({ count, source: "local_update_error" });
    }

    // Keep local fallback in sync as well
    setLocalCount(newCount);

    return NextResponse.json({ count: newCount, source: "database" });
  } catch (err) {
    console.error("Error in POST /api/visitor-count:", err);
    const count = getLocalCount() + 1;
    setLocalCount(count);
    return NextResponse.json({ count, source: "local_error" });
  }
}
