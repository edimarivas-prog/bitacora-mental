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
}; 

// 3. Función Anti-XSS (Limpia texto malicioso)
window.sanitize = function(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
};

// 4. RATE LIMITING (Protección Anti-Spam Cliente)
const RATE_LIMIT_RULES = {
    bookings: { max: 3, window: 60 * 1000 }, // 3 intentos por minuto
    login: { max: 5, window: 5 * 60 * 1000 } // 5 intentos en 5 minutos
};

window.checkRateLimit = function(action) {
    const rule = RATE_LIMIT_RULES[action];
    if (!rule) return; // Si no hay regla, pasar

    const key = `rt_limit_${action}`;
    const now = Date.now();
    
    // Obtener historial y filtrar viejos
    let history = JSON.parse(localStorage.getItem(key) || '[]');
    history = history.filter(time => now - time < rule.window);

    // Verificar límite
    if (history.length >= rule.max) {
        const waitSeconds = Math.ceil((rule.window - (now - history[0])) / 1000);
        throw new Error(`Demasiados intentos. Por favor espera ${waitSeconds} segundos.`);
    }

    // Registrar nuevo intento
    history.push(now);
    localStorage.setItem(key, JSON.stringify(history));
};


// 6. SISTEMA DE CACHÉ (Optimización de Rendimiento)
// Guarda datos en el navegador por 5 minutos para no saturar la base de datos
window.CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

window.fetchWithCache = async function(key, fetchFn) {
    const cached = localStorage.getItem(key);
    
    if (cached) {
        try {
            const { data, timestamp } = JSON.parse(cached);
            // Si el dato es fresco (menor a 5 min), úsalo
            if (Date.now() - timestamp < window.CACHE_DURATION) {
                console.log(`⚡ Usando caché para: ${key}`);
                return data;
            }
        } catch (e) {
            console.warn("Error leyendo caché", e);
        }
    }
    
    // Si no hay caché o expiró, busca en la DB
    console.log(`🌐 Buscando en red: ${key}`);
    const data = await fetchFn();
    
    // Guardar para la próxima
    if (data) {
        localStorage.setItem(key, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    }
    
    return data;
};
