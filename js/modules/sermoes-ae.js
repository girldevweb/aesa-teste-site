// Configuração do player de áudio
const audioPlayer = {
    currentTrackIndex: 0,
    playlist: [],
    isPlaying: false,
    isSequencial: false,
    isReiniciar: false,

    // Elementos da interface
    elements: {
        title: document.querySelector('.sermoes-ae-titulo'),
        player: document.querySelector('.sermoes-ae-player'),
        btnPlay: document.querySelector('.sermoes-ae-btn-play'),
        btnAnterior: document.querySelector('.sermoes-ae-btn-anterior'),
        btnProximo: document.querySelector('.sermoes-ae-btn-proximo'),
        btnSequencia: document.querySelector('.sermoes-ae-btn-sequencia'),
        btnReiniciar: document.querySelector('.sermoes-ae-btn-reiniciar'),
        progresso: document.querySelector('.sermoes-ae-progresso'),
        progressoBarra: document.querySelector('.sermoes-ae-progresso-barra'),
        tempoAtual: document.querySelector('.sermoes-ae-tempo-atual'),
        tempoTotal: document.querySelector('.sermoes-ae-tempo-total'),
        searchInput: document.querySelector('.sermoes-ae-input'),
        searchButton: document.querySelector('.sermoes-ae-btn-busca'),
        playlistDiv: document.querySelector('.sermoes-ae-playlist')
    },

    // Mostrar mensagem de erro
    showError(message) {
        let messageDiv = document.querySelector('.sermoes-ae-mensagem');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.className = 'sermoes-ae-mensagem';
            this.elements.playlistDiv.parentNode.insertBefore(messageDiv, this.elements.playlistDiv.nextSibling);
        }
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
    },

    // Esconder mensagem de erro
    hideError() {
        const messageDiv = document.querySelector('.sermoes-ae-mensagem');
        if (messageDiv) {
            messageDiv.style.display = 'none';
        }
    },

    // Carregar a playlist
    async loadPlaylist() {
        try {
            this.elements.playlistDiv.classList.add('loading');

            // Lista de sermões com seus caminhos locais
            this.playlist = [
                { title: 'I Pedro 5 A libertação da Ansiedade', path: '../sermoes-aesa/I Pedro 5 A libertação da Ansiedade.mp3', duration: '--:--' },
                { title: 'Filipenses 4: 2-7 Alegrai-vos sempre no Senhor', path: '../sermoes-aesa/Filip 4 2-7 Alegraivos sempre no Senhor.mp3', duration: '--:--' },
                { title: 'Lucas 6: 6-11 Passos para Vitória', path: '../sermoes-aesa/Lucas 6 6-11 Passos para Vitória.mp3', duration: '--:--' },
                { title: 'Salmo 145 Perto está o Senhor', path: '../sermoes-aesa/Salmo 145 Perto está o Senhor.mp3', duration: '--:--' },
                { title: 'Gálatas 1: 3-5 A Cruz e a Salvação', path: '../sermoes-aesa/Gálatas 1 3-5 A Cruz e a Salvação.mp3', duration: '--:--' },
                { title: 'Lucas 5: 17 a 26 Jesus quer equipar a nossa fé', path: '../sermoes-aesa/Lucas 5-17 a 26 Jesus quer equipar a nossa fé.mp3', duration: '--:--' },
                { title: 'Hebreus 11: 4-8 Senhor Encontrei Teus Altares', path: '../sermoes-aesa/Hebreus 11 4-8 Senhor Encontrei Teus Altares.mp3', duration: '--:--' },
                { title: 'Hebreus 11 - Fé que agrada a Deus', path: '../sermoes-aesa/Herbreus 11 - Fé que agrada a Deus.mp3', duration: '--:--' },
                { title: 'Apocalipse 4: 1-11 Degraus Espirituais', path: '../sermoes-aesa/Apocalipse 4 1-11 Degraus Espirituais.mp3', duration: '--:--' }
              
            ];

            this.renderPlaylist();
            this.elements.playlistDiv.classList.remove('loading');

            // Carregar durações em segundo plano
            this.loadDurations();
        } catch (error) {
            console.error('Erro ao carregar a playlist:', error);
            this.showError('Erro ao carregar os sermões. Tente novamente mais tarde.');
            this.elements.playlistDiv.classList.remove('loading');
        }
    },

    // Carregar durações dos áudios
    async loadDurations() {
        const promises = this.playlist.map((track, index) => {
            return new Promise((resolve) => {
                const audio = new Audio();
                audio.src = track.path;
                
                audio.onloadedmetadata = () => {
                    const duration = this.formatDuration(audio.duration);
                    this.playlist[index].duration = duration;
                    this.renderPlaylist();
                    resolve();
                };
                
                audio.onerror = () => {
                    console.error(`Erro ao carregar duração de ${track.title}`);
                    resolve();
                };
                
                // Timeout para evitar que fique carregando indefinidamente
                setTimeout(() => {
                    if (!track.duration) {
                        this.playlist[index].duration = '--:--';
                        this.renderPlaylist();
                    }
                    resolve();
                }, 5000);
            });
        });

        try {
            await Promise.all(promises);
        } catch (error) {
            console.error('Erro ao carregar durações:', error);
        }
    },

    // Carregar uma faixa
    async loadTrack(index) {
        if (index >= 0 && index < this.playlist.length) {
            this.currentTrackIndex = index;
            const track = this.playlist[index];
            
            try {
                console.log('Carregando faixa:', track.title);
                this.elements.title.textContent = track.title;
                this.renderPlaylist();

                this.elements.player.src = track.path;
                this.elements.player.load();
                
                this.elements.player.oncanplay = () => {
                    console.log('Áudio pronto para reprodução');
                    this.elements.player.play()
                        .then(() => {
                            this.isPlaying = true;
                            this.elements.btnPlay.innerHTML = '<i class="fas fa-pause"></i>';
                        })
                        .catch(error => {
                            console.error('Erro ao reproduzir:', error);
                            this.isPlaying = false;
                            this.elements.btnPlay.innerHTML = '<i class="fas fa-play"></i>';
                        });
                };

                this.elements.player.onerror = (error) => {
                    console.error('Erro no player de áudio:', error);
                    this.showError('Erro ao carregar o áudio. Tente novamente.');
                    this.isPlaying = false;
                    this.elements.btnPlay.innerHTML = '<i class="fas fa-play"></i>';
                };
            } catch (error) {
                console.error('Erro ao carregar o áudio:', error);
                this.showError('Erro ao carregar o áudio. Tente novamente.');
                this.isPlaying = false;
                this.elements.btnPlay.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
    },

    // Formatar duração em minutos:segundos
    formatDuration(seconds) {
        if (!seconds || isNaN(seconds)) return '--:--';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    },

    // Renderizar a playlist na interface
    renderPlaylist(filteredList = null) {
        const list = filteredList || this.playlist;
        this.elements.playlistDiv.innerHTML = '';

        if (list.length === 0) {
            this.elements.playlistDiv.innerHTML = '<div class="sermoes-ae-playlist-empty">Nenhum sermão encontrado</div>';
            return;
        }

        list.forEach((track, index) => {
            const item = document.createElement('div');
            item.className = `sermoes-ae-playlist-item${index === this.currentTrackIndex ? ' active' : ''}`;
            
            // Adiciona classe de carregamento se a duração ainda não estiver disponível
            if (!track.duration) {
                item.classList.add('loading');
            }
            
            item.innerHTML = `
                <div class="sermoes-ae-playlist-title">${track.title}</div>
                <div class="sermoes-ae-playlist-duration">${track.duration || '--:--'}</div>
            `;

            item.addEventListener('click', () => {
                const items = this.elements.playlistDiv.querySelectorAll('.sermoes-ae-playlist-item');
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                this.loadTrack(index);
            });
            
            this.elements.playlistDiv.appendChild(item);
        });
    },

    // Configurar os event listeners
    setupEventListeners() {
        // Controles principais
        this.elements.btnPlay.addEventListener('click', () => this.togglePlay());
        this.elements.btnAnterior.addEventListener('click', () => this.previousTrack());
        this.elements.btnProximo.addEventListener('click', () => this.nextTrack());
        this.elements.btnSequencia.addEventListener('click', () => this.toggleSequencia());
        this.elements.btnReiniciar.addEventListener('click', () => this.toggleReiniciar());
        
        // Barra de progresso
        this.elements.progresso.addEventListener('click', (e) => this.seek(e));
        this.elements.player.addEventListener('timeupdate', () => this.updateProgress());
        this.elements.player.addEventListener('ended', () => this.handleEnded());
        
        // Busca
        this.elements.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.elements.searchButton.addEventListener('click', () => 
            this.handleSearch(this.elements.searchInput.value)
        );
    },

    // Toggle play/pause
    togglePlay() {
        if (this.elements.player.paused) {
            this.elements.player.play()
                .then(() => {
                    this.isPlaying = true;
                    this.elements.btnPlay.innerHTML = '<i class="fas fa-pause"></i>';
                })
                .catch(error => {
                    console.error('Erro ao reproduzir:', error);
                    this.isPlaying = false;
                    this.elements.btnPlay.innerHTML = '<i class="fas fa-play"></i>';
                });
        } else {
            this.elements.player.pause();
            this.isPlaying = false;
            this.elements.btnPlay.innerHTML = '<i class="fas fa-play"></i>';
        }
    },

    // Próxima faixa
    nextTrack() {
        if (this.currentTrackIndex < this.playlist.length - 1) {
            this.loadTrack(this.currentTrackIndex + 1);
        }
    },

    // Faixa anterior
    previousTrack() {
        if (this.currentTrackIndex > 0) {
            this.loadTrack(this.currentTrackIndex - 1);
        }
    },

    // Atualizar barra de progresso
    updateProgress() {
        const progress = (this.elements.player.currentTime / this.elements.player.duration) * 100;
        this.elements.progressoBarra.style.width = `${progress}%`;
        this.elements.tempoAtual.textContent = this.formatTime(this.elements.player.currentTime);
        this.elements.tempoTotal.textContent = this.formatTime(this.elements.player.duration);
    },

    // Buscar posição no áudio
    seek(e) {
        const rect = this.elements.progresso.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        this.elements.player.currentTime = pos * this.elements.player.duration;
    },

    // Formatar tempo
    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    },

    // Manipular a busca
    handleSearch(query) {
        query = query.toLowerCase().trim();
        if (!query) {
            this.renderPlaylist();
            this.hideError();
            return;
        }

        const results = this.playlist.filter(track => 
            track.title.toLowerCase().includes(query)
        );

        if (results.length === 0) {
            this.showError('Nenhum sermão encontrado.');
            this.elements.playlistDiv.innerHTML = '';
        } else {
            this.hideError();
            this.renderPlaylist(results);
        }
    },

    // Toggle sequência aleatória
    toggleSequencia() {
        this.isSequencial = !this.isSequencial;
        this.elements.btnSequencia.classList.toggle('active');
    },

    // Toggle reiniciar
    toggleReiniciar() {
        this.isReiniciar = !this.isReiniciar;
        this.elements.btnReiniciar.classList.toggle('active');
    },

    // Manipular fim da faixa
    handleEnded() {
        if (this.isReiniciar) {
            this.elements.player.currentTime = 0;
            this.elements.player.play();
        } else if (this.isSequencial) {
            this.nextTrack();
        } else {
            this.nextTrack();
        }
    },

    // Inicializar o player
    init() {
        this.loadPlaylist();
        this.setupEventListeners();
    }
};

// Inicializar o player quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    audioPlayer.init();
}); 