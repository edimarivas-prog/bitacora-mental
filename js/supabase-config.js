var _SB_URL = 'https://wulnsvyyrfsaiartzypn.supabase.co'; 
var _SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bG5zdnl5cmZzYWlhcnR6eXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTQwNjgsImV4cCI6MjA4NTYzMDA2OH0.sa0JNGf3haLPz5poZBSMML6ydq3EJ1P84g0jpZf7Nv8';

// 1. Inicializar cliente Supabase si no existe
if (!window.sb) {
    if (typeof supabase !== 'undefined') {
        window.sb = supabase.createClient(_SB_URL, _SB_KEY);
        console.log("✅ Conexión establecida: Bitácora Mental (PE)");
    } else {
        console.error("❌ Error crítico: Librería Supabase no encontrada.");
    }
}

// 2. Función de Seguridad Centralizada
window.checkSession = async function() {
    try {
        // Esperar si la librería aún no cargó (fix para conexiones lentas)
        if (!window.sb) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Verificar token contra el servidor
        const { data: { user }, error } = await window.sb.auth.getUser();

        if (error || !user) {
            throw new Error('Sesión inválida o expirada');
        }

        return user; // Retorna usuario verificado

    } catch (e) {
        console.warn('🔒 Seguridad: Sesión no válida, cerrando...', e.message);
        
        // Limpieza total
        sessionStorage.clear();
        localStorage.clear(); 
        
        // Logout en Supabase si es posible
        if (window.sb) await window.sb.auth.signOut();

        // Redirección segura
        const isAppDir = window.location.pathname.includes('/app/');
        window.location.replace(isAppDir ? '../login.html' : 'login.html');
        
        return null;
    }
}; // <--- ESTA LLAVE Y PUNTO Y COMA ERAN LOS QUE FALTABAN

// 3. Función Anti-XSS (Limpia texto malicioso)
window.sanitize = function(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
};
