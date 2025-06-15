import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ujlrjeeoadgqmbjtunpy.supabase.co/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqbHJqZWVvYWRncW1ianR1bnB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1OTg4MjIsImV4cCI6MjA2NTE3NDgyMn0.kyXZN6Aqbcuh6o5T4ttNhJZHsVG686Hj8B7AcL9AXeQ'; // from Project Settings > API
export const supabase = createClient(supabaseUrl, supabaseKey);