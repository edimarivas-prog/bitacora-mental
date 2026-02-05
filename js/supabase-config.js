var _SB_URL = 'https://wulnsvyyrfsaiartzypn.supabase.co'; 
var _SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bG5zdnl5cmZzYWlhcnR6eXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTQwNjgsImV4cCI6MjA4NTYzMDA2OH0.sa0JNGf3haLPz5poZBSMML6ydq3EJ1P84g0jpZf7Nv8';

// Iniciamos solo si no existe ya
if (!window.sb) {
    if (typeof supabase !== 'undefined') {
        window.sb = supabase.createClient(_SB_URL, _SB_KEY);
        console.log("✅ Conexión establecida: Bitácora Mental (PE)");
    } else {
        console.error("❌ Error crítico: Librería Supabase no encontrada.");
    }
}
