import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ssbrskimmwetnuydduaa.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzYnJza2ltbXdldG51eWRkdWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1OTUyNDksImV4cCI6MjA5NzE3MTI0OX0.WkcUuUNs5pjRB5HzwGfOD1_1QsX5qHKHfLLiU9nwPDE";

// Singleton Supabase browser client
export const supabase = createClient(supabaseUrl, supabaseKey);
