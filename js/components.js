// js/components.js

/**
 * Renderiza la barra lateral (Sidebar) automáticamente.
 * @param {string} activePage - El ID de la página actual para marcarla como activa (ej: 'citas', 'dashboard')
 */
function renderSidebar(activePage) {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    // Mapa de navegación: ID, Texto, Icono, Link
    const menuItems = [
        { section: 'Principal', items: [
            { id: 'dashboard', label: 'Inicio', icon: 'home', link: 'dashboard.html' },
            { id: 'citas', label: 'Mis Citas', icon: 'calendar-alt', link: 'citas.html' },
            { id: 'especialistas', label: 'Especialistas', icon: 'user-md', link: 'especialistas.html' }
        ]},
        { section: 'Tu Espacio', items: [
            { id: 'diario', label: 'Diario', icon: 'book', link: 'diario.html' },
            { id: 'progreso', label: 'Progreso', icon: 'chart-line', link: 'progreso.html' },
            { id: 'recursos', label: 'Recursos', icon: 'box-open', link: 'recursos.html' }
        ]},
        { section: 'Cuenta', items: [
            { id: 'plan', label: 'Mi Plan', icon: 'crown', link: 'plan.html' },
            { id: 'configuracion', label: 'Configuración', icon: 'cog', link: 'configuracion.html' }
        ]}
    ];

    // Construcción del HTML
    let navHTML = '';
    
    menuItems.forEach(group => {
        navHTML += `<div class="nav-section">
            <div class="nav-title">${group.section}</div>`;
        
        group.items.forEach(item => {
            const isActive = activePage === item.id ? 'active' : '';
            // Ajuste para iconos alineados (width: 20px)
            navHTML += `
            <a href="${item.link}" class="nav-item ${isActive}">
                <i class="fas fa-${item.icon}" style="width:20px; text-align:center;"></i> ${item.label}
            </a>`;
        });
        
        navHTML += `</div>`;
    });

    // Agregar botón de salir al final
    const logoutHTML = `
    <div class="nav-section">
        <a href="#" onclick="logout()" class="nav-item" style="color:#EF4444">
            <i class="fas fa-sign-out-alt" style="width:20px; text-align:center;"></i> Salir
        </a>
    </div>`;

    container.innerHTML = `
    <aside class="sidebar" id="sidebar">
        <a href="dashboard.html" class="logo">
            <i class="fas fa-brain"></i> Bitácora Mental
        </a>
        ${navHTML}
        ${logoutHTML}
    </aside>
    `;
}

// Función global para el toggle del menú móvil
window.toggleSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('open');
};
