// 1. Definir las constantes (Asegúrate de que el nombre coincida abajo)
const SUPABASE_URL = 'https://wulnsvyyrfsaiartzypn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bG5zdnl5cmZzYWlhcnR6eXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTQwNjgsImV4cCI6MjA4NTYzMDA2OH0.sa0JNGf3haLPz5poZBSMML6ydq3EJ1P84g0jpZf7Nv8';

// 2. Inicializar el cliente globalmente usando los nombres correctos
// Usamos '_supabase' o verificamos el objeto global para evitar el error "already declared"
if (!window.supabase) {
    // IMPORTANTE: Aquí usamos las constantes que definimos arriba
    window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// 3. Helpers útiles (Se mantienen igual pero ahora funcionarán)
async function getCurrentUser() {
  const { data: { user }, error } = await window.supabase.auth.getUser();
  if (error) return null;
  return user;
}

async function isAuth() {
  const user = await getCurrentUser();
  return !!user;
}

async function logout() {
  await window.supabase.auth.signOut();
  window.location.href = 'login.html';
}
