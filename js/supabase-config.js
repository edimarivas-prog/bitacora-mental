// js/supabase-config.js

// 1. Verificamos si ya existe el cliente para no crearlo dos veces
if (!window.supabaseClient) {
    
    // USAMOS 'var' O DIRECTAMENTE LAS CADENAS PARA EVITAR EL ERROR DE "YA DECLARADO"
    // Reemplaza estos valores con tus credenciales reales de Supabase
    var SUPABASE_URL = 'https://wulnsvyyrfsaiartzypn.supabase.co'; 
    var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bG5zdnl5cmZzYWlhcnR6eXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTQwNjgsImV4cCI6MjA4NTYzMDA2OH0.sa0JNGf3haLPz5poZBSMML6ydq3EJ1P84g0jpZf7Nv8';

    // 2. Inicializamos el cliente
    // Asegúrate de que la librería de supabase-js se haya cargado antes que este script
    if (typeof supabase !== 'undefined') {
        window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        // Marcamos que ya se inicializó
        window.supabaseClient = true;
        console.log("✅ Supabase inicializado correctamente.");
    } else {
        console.error("❌ Error: La librería de Supabase no se ha cargado todavía.");
    }

} else {
    console.log("⚠️ Supabase ya estaba inicializado (script cargado dos veces).");
}
