import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://anoicomegfkbxkfppfms.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFub2ljb21lZ2ZrYnhrZnBwZm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MTUwNTUsImV4cCI6MjA0MjQ5MTA1NX0.LF_hhYm_SipviRnczPYHMEvD5jcDs-qN4r1215LG9Qs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;


