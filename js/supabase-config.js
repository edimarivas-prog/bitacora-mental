// js/supabase-config.js

// Usamos 'var' para evitar bloqueos si el archivo se carga dos veces
var _SUPABASE_URL = 'https://wulnsvyyrfsaiartzypn.supabase.co'; // ¡Pega tu URL real aquí!
var _SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bG5zdnl5cmZzYWlhcnR6eXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTQwNjgsImV4cCI6MjA4NTYzMDA2OH0.sa0JNGf3haLPz5poZBSMML6ydq3EJ1P84g0jpZf7Nv8'; // ¡Pega tu Key real aquí!

// Verificamos si ya existe nuestra conexión 'sb'
if (typeof window.sb === 'undefined') {
    
    // Verificamos que la librería oficial se haya cargado
    if (typeof supabase !== 'undefined') {
        // CREAMOS LA CONEXIÓN Y LA GUARDAMOS EN 'sb' (para no confundir)
        window.sb = supabase.createClient(_SUPABASE_URL, _SUPABASE_KEY);
        console.log("✅ Conexión a Supabase (window.sb) lista.");
    } else {
        console.error("❌ Error: La librería de Supabase no cargó.");
    }

} else {
    console.log("ℹ️ La conexión ya estaba lista.");
}
