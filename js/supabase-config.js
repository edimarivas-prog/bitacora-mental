// js/supabase-config.js

// 1. Verificamos si ya existe el cliente para no crearlo dos veces
if (!window.supabaseClient) {
    
    // USAMOS 'var' O DIRECTAMENTE LAS CADENAS PARA EVITAR EL ERROR DE "YA DECLARADO"
    // Reemplaza estos valores con tus credenciales reales de Supabase
    var SUPABASE_URL = 'AQUI_TU_URL_DE_SUPABASE'; 
    var SUPABASE_KEY = 'AQUI_TU_ANON_KEY_DE_SUPABASE';

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
