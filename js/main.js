import initMenu from './modules/menu.js';
import initAnimations from './modules/animations.js';
import Search from './modules/search.js';
import initMobileMenu from './modules/mobileMenu.js';
import initVideos from './modules/videos.js';

// Inicialização dos módulos
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initAnimations();
    
    // Inicializa o módulo de vídeos se estiver na página de vídeos
    if (document.querySelector('.videos-page')) {
        initVideos();
    }
    
    // Inicialização da busca
    const search = new Search();
    
    // Inicialização do Swiper para a seção de biografias
    const biografiaSwiper = new Swiper('.biografia-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: false,
        },
        navigation: false,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        grabCursor: true,
        touchRatio: 1.5,
        touchAngle: 45,
        keyboard: {
            enabled: true,
        },
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        observer: true,
        observeParents: true,
        breakpoints: {
            1400: {
                spaceBetween: 40,
            },
            1200: {
                spaceBetween: 30,
            },
            992: {
                spaceBetween: 20,
            },
            768: {
                spaceBetween: 15,
            }
        }
    });

    // Adiciona classe ativa ao slide atual
    biografiaSwiper.on('slideChange', function () {
        const slides = document.querySelectorAll('.biografia-slide');
        slides.forEach(slide => {
            slide.classList.remove('swiper-slide-active');
        });
        slides[biografiaSwiper.activeIndex].classList.add('swiper-slide-active');
    });

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') !== '#') {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Animação de fade-in para elementos ao rolar
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos com classes de animação
    document.querySelectorAll('[data-anime]').forEach(element => {
        observer.observe(element);
    });

    // Controle dos Submenus
    const submenuItems = document.querySelectorAll('.dropdown-submenu > a');
    
    submenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 1100) {
                e.preventDefault();
                const parent = item.parentElement;
                parent.classList.toggle('active');
            }
        });
    });

    // Fechar submenus ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-submenu')) {
            submenuItems.forEach(item => {
                item.parentElement.classList.remove('active');
            });
        }
    });

    // Carrossel de Livros Clean
    const bookSwiper = new Swiper('.book-swiper', {
        slidesPerView: 3,
        spaceBetween: 40,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            0:    { slidesPerView: 1, spaceBetween: 10 },
            480:  { slidesPerView: 2, spaceBetween: 20 },
            900:  { slidesPerView: 3, spaceBetween: 30 },
            1200: { slidesPerView: 4, spaceBetween: 40 }
        }
    });
});
