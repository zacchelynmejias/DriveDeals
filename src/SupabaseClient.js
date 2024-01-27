import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pqhqxnqvkjbrpefkqjmm.supabase.co' 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxaHF4bnF2a2picnBlZmtxam1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU5Nzk1NDAsImV4cCI6MjAyMTU1NTU0MH0.Qz-V3Mmv8bkIE34kEjzquEH8cCl2Qu2LhRkJpjApByQ'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase;