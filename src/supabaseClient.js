// src/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

// Pata vigezo vyako kutoka kwenye faili la .env
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Hakikisha vigezo vipo
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing from .env file!");
}

// Tengeneza na safirisha (export) mteja wa Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);