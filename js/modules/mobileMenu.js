export default function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const body = document.body;
    const dropdowns = document.querySelectorAll('.nav-mobile .dropdown');

    if (!mobileToggle || !navMobile) return;

    // Toggle menu mobile
    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        navMobile.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Gerenciar dropdowns
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Se o dropdown clicado já está aberto, apenas fecha
            if (dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
                return;
            }
            
            // Fecha outros dropdowns primeiro
            const activeDropdowns = Array.from(dropdowns).filter(other => 
                other !== dropdown && other.classList.contains('active')
            );
            
            if (activeDropdowns.length > 0) {
                // Fecha o dropdown ativo
                activeDropdowns[0].classList.remove('active');
                
                // Espera a transição de fechamento terminar antes de abrir o novo
                setTimeout(() => {
                    dropdown.classList.add('active');
                }, 300); // Tempo igual à duração da transição no CSS
            } else {
                // Se não há dropdowns abertos, abre imediatamente
                dropdown.classList.add('active');
            }
        });
    });

    // Fechar menu apenas ao clicar em links que não são dropdowns
    document.querySelectorAll('.nav-mobile a:not(.dropdown > .nav-link)').forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            navMobile.classList.remove('active');
            body.classList.remove('menu-open');
            // Fecha todos os dropdowns
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!navMobile.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMobile.classList.remove('active');
            body.classList.remove('menu-open');
            // Fecha todos os dropdowns
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // Fechar menu ao redimensionar
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1100) {
            mobileToggle.classList.remove('active');
            navMobile.classList.remove('active');
            body.classList.remove('menu-open');
            // Fecha todos os dropdowns
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
} 