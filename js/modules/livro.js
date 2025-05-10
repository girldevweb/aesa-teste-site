import { AudioPlayer } from './audio-livro.js';

// Classe principal para gerenciar a página do livro
export class BookManager {
    constructor() {
        this.initializeElements();
        this.loadBookData();
    }

    initializeElements() {
        // Elementos principais
        this.coverImg = document.getElementById('bookCover');
        this.title = document.getElementById('bookTitle');
        this.author = document.getElementById('bookAuthor');
        this.category = document.getElementById('bookCategory');
        this.description = document.getElementById('bookDescription');
        
        // Elementos de detalhes
        this.authorDetail = document.getElementById('bookAuthorDetail');
        this.categoryDetail = document.getElementById('bookCategoryDetail');
        this.pages = document.getElementById('bookPages');
        this.year = document.getElementById('bookYear');

        // Player de áudio
        this.audioBtn = document.getElementById('audioBtn');
        this.audioSection = document.getElementById('audioSection');
        this.playerCover = document.getElementById('playerCover');
        this.playerTitle = document.getElementById('playerTitle');

        this.initializeEvents();
    }

    initializeEvents() {
        // Evento para o botão de áudio
        this.audioBtn?.addEventListener('click', () => this.toggleAudioPlayer());

        // Eventos para os botões de ação
        document.querySelector('.btn-primario')?.addEventListener('click', () => this.handleRead());
        document.querySelectorAll('.btn-secundario')[0]?.addEventListener('click', () => this.handleDownload());
    }

    async loadBookData() {
        try {
            // Pegar o ID do livro da URL
            const urlParams = new URLSearchParams(window.location.search);
            const bookId = urlParams.get('id');

            if (!bookId) {
                throw new Error('ID do livro não especificado');
            }

            // Lista de livros (simulando um banco de dados)
            const books = [
                {
                    id: 1,
                    title: "Cartas de Amor",
                    author: "Maria José A. Elias e Rev. Antônio Elias",
                    cover: "../images/livros/Cartas de Amor.jpg",
                    category: "Testemunhos",
                    description: "Uma obra profunda sobre o poder da oração baseada nos ensinamentos bíblicos.",
                    pages: "180",
                    year: "1995"
                },
                {
                    id: 2,
                    title: "Testemunhos Vivos",
                    author: "Rev. Antônio Elias",
                    cover: "../images/livros/Testemunhos.jpg",
                    category: "Testemunhos",
                    description: "Uma reflexão sobre a presença constante de Deus em nossas vidas.",
                    pages: "200",
                    year: "1998"
                },
                {
                    id: 3,
                    title: "Sementeira da Palavra",
                    author: "Rev. Antônio Elias",
                    cover: "../images/livros/Sementeira.jpg",
                    category: "Sermões",
                    description: "Uma coleção de sermões do pastor Antônio Elias.",
                    pages: "150",
                    year: "2000"
                },
                {  
                    id: 4,
                    title: "O teu Deus, onde está?",
                    author: "Maria José A. Elias",
                    cover: "../images/livros/O teu Deus.jpg",
                    category: "Espiritualidade",
                    description: "Uma reflexão sobre a presença constante de Deus em nossas vidas.",
                    pages: "200",
                    year: "1998"
                },
                {
                    id: 5,
                    title: "Água feita vinho",
                    author: "Maria José A. Elias e Rev. Antônio Elias",
                    cover: "../images/livros/Agua feita.jpg",
                    category: "Estudo Bíblico",
                    description: "Uma reflexão sobre a presença constante de Deus em nossas vidas.",
                    pages: "200",
                    year: "1998"
                },
                {
                    id: 6,
                    title: "Cantigas para o meu Deus",
                    author: "Maria José A. Elias",  
                    cover: "../images/livros/Cantigas.jpg",
                    category: "Poesia",
                    description: "Uma reflexão sobre a presença constante de Deus em nossas vidas.",
                    pages: "200",
                    year: "1998"
                },
                {
                    id: 7,
                    title: "Era sem forma e vazia...",
                    author: "Maria José A. Elias",
                    cover: "../images/livros/era-sem-forma.jpg",
                    category: "Estudo Bíblico",
                    description: "Uma reflexão sobre a presença constante de Deus em nossas vidas.",
                    pages: "200",
                    year: "1998"
                },
                {
                    id: 8,
                    title: "Família em Foco",
                    author: "Maria José A. Elias",
                    cover: "../images/livros/Familia em Foco.jpg",
                    category: "Família",
                    description: "Uma reflexão sobre a presença constante de Deus em nossas vidas.",
                    pages: "200",
                    year: "1998"
                },
                {
                    id: 9,
                    title: "Sucata de Lembranças",
                    author: "Maria José A. Elias",
                    cover: "../images/livros/Sucata.jpg",
                    category: "Poesia",
                    description: "Uma reflexão sobre a presença constante de Deus em nossas vidas.",
                    pages: "200",
                    year: "1998"
                },
                {
                    id: 10, 
                    title: "Propostas Bíblicas para a Liderança Cristã",
                    author: "Maria José A. Elias",
                    cover: "../images/livros/Propostas.jpg",
                    category: "Liderança",
                    description: "Uma reflexão sobre a presença constante de Deus em nossas vidas.",    
                    pages: "200",   
                    year: "1998"
                },
                {
                    id: 11,
                    title: "A Família do Pastor e a Igreja",
                    author: "Maria José A. Elias",
                    cover: "../images/livros/A Familia do Pastor.jpg",
                    category: "Família",
                    description: "Uma reflexão sobre a presença constante de Deus em nossas vidas.",
                    pages: "200",
                    year: "1998"
                },
                {
                    id: 12,
                    title: "Passos pelo caminho",
                    author: "Maria José A. Elias",
                    cover: "../images/livros/Passos.jpg",
                    category: "Vida Cristã",
                    description: "Uma reflexão sobre a presença constante de Deus em nossas vidas.",
                    pages: "200",
                    year: "1998"
                },
                {
                    id: 13,
                    title: "O Deus Presente",
                    author: "Maria José A. Elias",
                    cover: "../images/livros/O Deus Presente.jpg",
                    category: "Espiritualidade",
                    description: "Uma reflexão sobre a presença constante de Deus em nossas vidas.",
                    pages: "200",
                    year: "1998"
                },
                {   
                    id: 14, 
                    title: "A Oração na Bíblia",
                    author: "Maria José A. Elias",
                    cover: "../images/livros/Oracao.jpg",
                    category: "Oração",
                    description: "Uma reflexão sobre a presença constante de Deus em nossas vidas.",
                    pages: "200",
                    year: "1998"
                }   
                
                // ... outros livros da sua lista
            ];

            // Encontrar o livro pelo ID
            const book = books.find(b => b.id === parseInt(bookId));

            if (!book) {
                throw new Error('Livro não encontrado');
            }

            this.updateUI(book);

        } catch (error) {
            console.error('Erro ao carregar dados do livro:', error);
            this.showError('Não foi possível carregar os dados do livro');
        }
    }

    updateUI(book) {
        // Atualizar elementos principais
        if (this.coverImg) {
            this.coverImg.src = book.cover;
            this.coverImg.alt = `Capa do livro ${book.title}`;
        }
        if (this.title) this.title.textContent = book.title;
        if (this.author) this.author.textContent = `por ${book.author}`;
        if (this.category) this.category.textContent = book.category;
        if (this.description) this.description.textContent = book.description;

        // Atualizar detalhes
        if (this.authorDetail) this.authorDetail.textContent = book.author;
        if (this.categoryDetail) this.categoryDetail.textContent = book.category;
        if (this.pages) this.pages.textContent = `${book.pages} páginas`;
        if (this.year) this.year.textContent = book.year;

        // Atualizar player de áudio
        if (this.playerCover) this.playerCover.src = book.cover;
        if (this.playerTitle) this.playerTitle.textContent = book.title;

        // Atualizar título da página
        document.title = `${book.title} - Biblioteca Digital`;
    }

    toggleAudioPlayer() {
        this.audioSection?.classList.toggle('hidden');
        if (!this.audioSection?.classList.contains('hidden')) {
            this.audioSection?.scrollIntoView({ behavior: 'smooth' });
        }
    }

    handleRead() {
        // Implementar lógica para leitura online
        console.log('Iniciando leitura do livro...');
    }

    handleDownload() {
        // Implementar lógica para download
        console.log('Iniciando download do livro...');
    }

    showError(message) {
        // Implementar exibição de erro
        console.error(message);
        // Você pode adicionar aqui uma lógica para mostrar um toast ou modal de erro
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new BookManager();
});

// Exporta para uso em outros módulos se necessário
export { AudioPlayer }; 