// js/supabase-config.js

const SUPABASE_URL = 'https://wulnsvyyrfsaiartzypn.supabase.co'  // REEMPLAZA CON TU  URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bG5zdnl5cmZzYWlhcnR6eXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTQwNjgsImV4cCI6MjA4NTYzMDA2OH0.sa0JNGf3haLPz5poZBSMML6ydq3EJ1P84g0jpZf7Nv8'  // REEMPLAZA CON TU ANON KEY

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

// Helpers útiles
async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

async function isAuth() {
  const user = await getCurrentUser()
  return !!user
}

async function logout() {
  await supabase.auth.signOut()
  window.location.href = '/login.html'
}
