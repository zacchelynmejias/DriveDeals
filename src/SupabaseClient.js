import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tucehosqsvzjbiimoonv.supabase.co' 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Y2Vob3Nxc3Z6amJpaW1vb252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyOTY3NjYsImV4cCI6MjAxOTg3Mjc2Nn0.j9MT73kqz-KlsV9xou5oLvNDySN9qMpSxxSFMmQ-WPY'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase;