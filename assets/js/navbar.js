/* =============================================
   NAVBAR FUNCTIONALITY
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navItemsWithDropdown = document.querySelectorAll('.nav-item.has-dropdown');
    
    // Sticky Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.classList.contains('open');
            
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', !isOpen);
            
            // Prevent scrolling when mobile menu is open
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        // Close menu when clicking a link (optional, but good for UX)
        const navLinks = navMenu.querySelectorAll('.nav-link:not([aria-haspopup="true"])');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // Dropdown for Mobile
    // Handle mobile click toggle
    const dropdownToggles = document.querySelectorAll('.nav-link[aria-haspopup="true"]');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // Only handle click for mobile screens
            if (window.innerWidth <= 900) {
                e.preventDefault();
                const parent = toggle.parentElement;
                const isOpen = parent.classList.contains('open');
                
                // Close other dropdowns
                document.querySelectorAll('.nav-item.open').forEach(item => {
                    if (item !== parent) item.classList.remove('open');
                });
                
                parent.classList.toggle('open');
                toggle.setAttribute('aria-expanded', !isOpen);
            }
        });
    });

    // Close mobile menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            navToggle?.classList.remove('open');
            navMenu?.classList.remove('open');
            navToggle?.setAttribute('aria-expanded', 'false');
            document.querySelectorAll('.nav-item.open').forEach(item => {
                item.classList.remove('open');
            });
            document.body.style.overflow = '';
        }
    });
});
