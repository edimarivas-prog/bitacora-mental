// js/supabase-config.js

// Definimos las constantes con los nombres que ya tienes
const SUPABASE_URL = 'https://wulnsvyyrfsaiartzypn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bG5zdnl5cmZzYWlhcnR6eXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTQwNjgsImV4cCI6MjA4NTYzMDA2OH0.sa0JNGf3haLPz5poZBSMML6ydq3EJ1P84g0jpZf7Nv8';

// Usamos una validación para NO declarar la variable si ya existe
if (typeof window.supabaseClient === 'undefined') {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// Para que tus otros scripts no fallen, creamos un alias
window.supabase = window.supabaseClient;

// Helpers útiles
async function getCurrentUser() {
    const { data: { user }, error } = await window.supabase.auth.getUser();
    return error ? null : user;
}

async function logout() {
    await window.supabase.auth.signOut();
    window.location.href = 'login.html';
}
