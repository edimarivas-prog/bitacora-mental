// js/supabase-config.js

// Usamos 'var' para que no explote si el script se carga dos veces
var _SB_URL = 'https://wulnsvyyrfsaiartzypn.supabase.co'; // 🔴 PEGA TU URL DE SUPABASE
var _SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bG5zdnl5cmZzYWlhcnR6eXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTQwNjgsImV4cCI6MjA4NTYzMDA2OH0.sa0JNGf3haLPz5poZBSMML6ydq3EJ1P84g0jpZf7Nv8'; // 🔴 PEGA TU ANON KEY DE SUPABASE

// Solo iniciamos si no existe ya 'window.sb'
if (!window.sb) {
    if (typeof supabase !== 'undefined') {
        // Creamos el cliente y lo guardamos en 'sb'
        window.sb = supabase.createClient(_SB_URL, _SB_KEY);
        console.log("✅ Supabase (window.sb) listo.");
    } else {
        console.error("❌ Error: La librería de Supabase no cargó.");
    }
}
