/**
 * MOBILE-NAVIGATION.JS
 * Sistema completo de navegación móvil optimizada
 * Bitácora Mental v2.0
 */

// ============================================
// 🎯 CONFIGURACIÓN GLOBAL
// ============================================

const MobileNav = {
  isOpen: false,
  lastScrollY: 0,
  scrollThreshold: 10,
  
  init() {
    this.createMobileNav();
    this.createSidebarOverlay();
    this.setupEventListeners();
    this.improveFormInputs();
    this.addSwipeGestures();
    this.addScrollBehavior();
    this.fixViewportHeight();
    console.log('✅ Mobile Navigation initialized');
  },
  
  // ============================================
  // 📱 CREAR BARRA MÓVIL SUPERIOR
  // ============================================
  
  createMobileNav() {
    // Verificar si ya existe
    if (document.querySelector('.mobile-nav-improved')) return;
    
    const nav = document.createElement('div');
    nav.className = 'mobile-nav-improved';
    nav.innerHTML = `
      <button class="nav-back-btn" onclick="MobileNav.goBack()" style="display: none;">
        <i class="fas fa-arrow-left"></i>
      </button>
      
      <a href="dashboard.html" class="nav-logo">
        <i class="fas fa-brain"></i>
        <span>Bitácora</span>
      </a>
      
      <button class="nav-menu-btn" onclick="MobileNav.toggleSidebar()">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    `;
    
    document.body.insertBefore(nav, document.body.firstChild);
    
    // Mostrar botón de volver si no es dashboard
    const currentPage = window.location.pathname;
    if (!currentPage.includes('dashboard')) {
      nav.querySelector('.nav-back-btn').style.display = 'flex';
    }
  },
  
  // ============================================
  // 🎨 CREAR OVERLAY OSCURO
  // ============================================
  
  createSidebarOverlay() {
    if (document.querySelector('.sidebar-overlay')) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.onclick = () => this.closeSidebar();
    document.body.appendChild(overlay);
  },
  
  // ============================================
  // 🔄 TOGGLE SIDEBAR
  // ============================================
  
  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const btn = document.querySelector('.nav-menu-btn');
    
    if (!sidebar) return;
    
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      sidebar.classList.add('open');
      overlay.classList.add('active');
      btn.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevenir scroll
    } else {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      btn.classList.remove('active');
      document.body.style.overflow = '';
    }
  },
  
  closeSidebar() {
    if (!this.isOpen) return;
    this.toggleSidebar();
  },
  
  openSidebar() {
    if (this.isOpen) return;
    this.toggleSidebar();
  },
  
  // ============================================
  // ◀️ NAVEGACIÓN HACIA ATRÁS
  // ============================================
  
  goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'dashboard.html';
    }
  },
  
  // ============================================
  // 👆 GESTOS DE SWIPE
  // ============================================
  
  addSwipeGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      this.handleSwipe(touchStartX, touchEndX, touchStartY, touchEndY);
    }, { passive: true });
  },
  
  handleSwipe(startX, endX, startY, endY) {
    const diffX = endX - startX;
    const diffY = endY - startY;
    
    // Solo procesar si el swipe es más horizontal que vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
      
      // Swipe de izquierda a derecha (abrir sidebar)
      if (diffX > 100 && startX < 50 && !this.isOpen) {
        this.openSidebar();
      }
      
      // Swipe de derecha a izquierda (cerrar sidebar)
      if (diffX < -100 && this.isOpen) {
        this.closeSidebar();
      }
    }
  },
  
  // ============================================
  // 📜 COMPORTAMIENTO DE SCROLL
  // ============================================
  
  addScrollBehavior() {
    let ticking = false;
    const nav = document.querySelector('.mobile-nav-improved');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Ocultar navbar al hacer scroll down
          if (currentScrollY > this.lastScrollY && currentScrollY > 80) {
            nav.style.transform = 'translateY(-100%)';
          } else {
            nav.style.transform = 'translateY(0)';
          }
          
          // Agregar sombra al hacer scroll
          if (currentScrollY > 10) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
          
          this.lastScrollY = currentScrollY;
          ticking = false;
        });
        
        ticking = true;
      }
    }, { passive: true });
  },
  
  // ============================================
  // ⌨️ MEJORAR INPUTS (PREVENIR ZOOM iOS)
  // ============================================
  
  improveFormInputs() {
    // Agregar font-size 16px a todos los inputs para prevenir zoom en iOS
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      if (input.style.fontSize === '') {
        input.style.fontSize = '16px';
      }
    });
    
    // Mejorar labels de inputs
    inputs.forEach(input => {
      const label = input.previousElementSibling;
      if (label && label.tagName === 'LABEL') {
        label.style.cursor = 'pointer';
        label.onclick = () => input.focus();
      }
    });
  },
  
  // ============================================
  // 📏 FIX VIEWPORT HEIGHT (100vh iOS)
  // ============================================
  
  fixViewportHeight() {
    // Calcular altura real del viewport (importante para iOS)
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
  },
  
  // ============================================
  // 🎯 LISTENERS GLOBALES
  // ============================================
  
  setupEventListeners() {
    // Cerrar sidebar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeSidebar();
      }
    });
    
    // Cerrar sidebar al hacer click en nav-item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          setTimeout(() => this.closeSidebar(), 200);
        }
      });
    });
  }
};

// ============================================
// 🎨 ESTILOS CSS INYECTADOS
// ============================================

const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
  /* ============================================
     BARRA MÓVIL MEJORADA
     ============================================ */
  
  .mobile-nav-improved {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: var(--white, #FFFFFF);
    border-bottom: 1px solid var(--border, #E6EFE8);
    z-index: 1500;
    padding: 0 16px;
    align-items: center;
    justify-content: space-between;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .mobile-nav-improved.scrolled {
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  @media (max-width: 900px) {
    .mobile-nav-improved {
      display: flex;
    }
  }
  
  /* ============================================
     BOTONES DE LA NAVBAR
     ============================================ */
  
  .nav-back-btn,
  .nav-menu-btn {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    border: none;
    background: var(--primary-50, #F0F9F4);
    color: var(--primary, #4F6F52);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1.2rem;
  }
  
  .nav-back-btn:active,
  .nav-menu-btn:active {
    transform: scale(0.95);
    background: var(--primary-100, #DCF2E4);
  }
  
  /* ============================================
     LOGO CENTRAL
     ============================================ */
  
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--primary, #4F6F52);
    text-decoration: none;
  }
  
  .nav-logo i {
    font-size: 1.4rem;
  }
  
  /* ============================================
     ANIMACIÓN HAMBURGUESA
     ============================================ */
  
  .hamburger-line {
    display: block;
    width: 20px;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    transition: all 0.3s;
    position: absolute;
  }
  
  .hamburger-line:nth-child(1) {
    transform: translateY(-6px);
  }
  
  .hamburger-line:nth-child(3) {
    transform: translateY(6px);
  }
  
  .nav-menu-btn.active .hamburger-line:nth-child(1) {
    transform: rotate(45deg);
  }
  
  .nav-menu-btn.active .hamburger-line:nth-child(2) {
    opacity: 0;
  }
  
  .nav-menu-btn.active .hamburger-line:nth-child(3) {
    transform: rotate(-45deg);
  }
  
  /* ============================================
     OVERLAY OSCURO
     ============================================ */
  
  .sidebar-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1900;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .sidebar-overlay.active {
    display: block;
    opacity: 1;
  }
  
  /* ============================================
     SIDEBAR MEJORADO
     ============================================ */
  
  @media (max-width: 900px) {
    .sidebar {
      transform: translateX(-100%);
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 280px;
      z-index: 2000;
      box-shadow: 2px 0 20px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    
    .sidebar.open {
      transform: translateX(0);
    }
    
    /* Ajustar contenido principal */
    .main {
      margin-left: 0 !important;
      padding-top: 80px !important;
      width: 100%;
    }
  }
  
  /* ============================================
     BOTÓN FLOTANTE (FAB)
     ============================================ */
  
  .mobile-fab {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--primary, #4F6F52);
    color: white;
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s;
  }
  
  @media (max-width: 900px) {
    .mobile-fab {
      display: flex;
    }
  }
  
  .mobile-fab:active {
    transform: scale(0.95);
  }
  
  /* ============================================
     FIX VIEWPORT HEIGHT (iOS)
     ============================================ */
  
  .full-height {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }
  
  /* ============================================
     MEJORAS DE TOUCH TARGETS
     ============================================ */
  
  @media (max-width: 900px) {
    button, a, input[type="submit"], input[type="button"] {
      min-height: 44px;
      min-width: 44px;
    }
    
    .nav-item {
      padding: 14px 16px;
      font-size: 1rem;
    }
    
    .nav-item i {
      font-size: 1.3rem;
      width: 24px;
    }
  }
  
  /* ============================================
     SAFE AREAS (iOS NOTCH)
     ============================================ */
  
  @media (max-width: 900px) {
    .mobile-nav-improved {
      padding-top: env(safe-area-inset-top);
      padding-left: max(16px, env(safe-area-inset-left));
      padding-right: max(16px, env(safe-area-inset-right));
      height: calc(60px + env(safe-area-inset-top));
    }
    
    .main {
      padding-bottom: calc(20px + env(safe-area-inset-bottom)) !important;
    }
    
    .sidebar {
      padding-bottom: env(safe-area-inset-bottom);
    }
    
    .mobile-fab {
      bottom: calc(20px + env(safe-area-inset-bottom));
      right: calc(20px + env(safe-area-inset-right));
    }
  }
  
  /* ============================================
     ANIMACIONES SUAVES
     ============================================ */
  
  @media (max-width: 900px) {
    .fade-in-up {
      animation: fadeInUp 0.4s ease;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
  
  /* ============================================
     PREVENIR ZOOM EN INPUTS (iOS)
     ============================================ */
  
  @media (max-width: 900px) {
    input, select, textarea {
      font-size: 16px !important;
    }
  }
  
  /* ============================================
     MEJORAR MODALES EN MÓVIL
     ============================================ */
  
  @media (max-width: 900px) {
    .modal {
      padding: 0;
      align-items: flex-end;
    }
    
    .modal-content {
      max-width: 100%;
      width: 100%;
      max-height: 90vh;
      border-radius: 20px 20px 0 0;
      margin: 0;
      animation: slideUpModal 0.3s ease;
    }
    
    @keyframes slideUpModal {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
  }
  
  /* ============================================
     SCROLL SUAVE
     ============================================ */
  
  html {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  
  /* ============================================
     PERFORMANCE (REDUCIR ANIMACIONES)
     ============================================ */
  
  @media (max-width: 900px) and (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

document.head.appendChild(mobileStyles);

// ============================================
// 🚀 INICIALIZACIÓN AUTOMÁTICA
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => MobileNav.init());
} else {
  MobileNav.init();
}

// ============================================
// 🌐 EXPORTAR PARA USO GLOBAL
// ============================================

window.MobileNav = MobileNav;

// Compatibilidad con funciones antiguas
window.toggleMenu = () => MobileNav.toggleSidebar();
window.toggleSidebar = () => MobileNav.toggleSidebar();

console.log('✅ Mobile Navigation System loaded');
