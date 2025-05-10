document.addEventListener('DOMContentLoaded', function() {
    // Elementos da galeria
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Função para filtrar itens
    function filterItems(category) {
        galleryItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                // Adiciona classe visible para animação
                setTimeout(() => {
                    item.classList.add('visible');
                }, 100);
            } else {
                item.classList.remove('visible');
                item.style.display = 'none';
            }
        });
    }

    // Adiciona evento de clique aos botões de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona classe active ao botão clicado
            this.classList.add('active');
            // Filtra itens baseado na categoria
            filterItems(this.dataset.filter);
        });
    });

    // Animação de entrada dos itens
    function animateItems() {
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        });
    }

    // Inicializa a animação
    animateItems();

    // Observador de interseção para animação ao rolar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observa cada item da galeria
    galleryItems.forEach(item => {
        observer.observe(item);
    });
}); 