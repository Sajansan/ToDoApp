import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aajhmqrotozqwraywmwg.supabase.co";
const supabaseKey = "sb_publishable_D73Rcb59c5K2Vja5Z1JkqA_YXCGxgjl";

export const supabase = createClient(supabaseUrl, supabaseKey);
