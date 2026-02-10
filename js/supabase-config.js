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

// ✅ FUNCIÓN DE SEGURIDAD CENTRALIZADA
window.checkSession = async function() {
    try {
        // Esperar a que sb esté listo si cargó lento
        if (!window.sb) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // 1. Validar contra el servidor (getUser es más seguro que getSession)
        const { data: { user }, error } = await window.sb.auth.getUser();

        if (error || !user) {
            throw new Error('Sesión no válida o expirada');
        }

        return user; // Retorna el usuario verificado

    } catch (e) {
        console.warn('🔒 Seguridad: Redirigiendo al login...', e.message);
        
        // 2. Limpieza profunda
        sessionStorage.clear();
        localStorage.removeItem('sb-' + window.sbProjectUrl + '-auth-token'); // Limpia token específico
        
        // 3. Logout forzado en cliente
        await window.sb.auth.signOut();

        // 4. Redirección segura (reemplaza historial)
        // Detectar si estamos en carpeta 'app' o raíz para la ruta correcta
        const path = window.location.pathname.includes('/app/') ? '../login.html' : 'login.html';
        window.location.replace(path);
        
        return null;
    }
};
