// Configuración de medios predefinidos
const mediaFiles = [
    {
        name: "Venearci",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/venearci-intro-video3.mp4",
        type: "..."
    },
    {
        name: "Mlb - MIL - NYM ( 7:10 PM/ET )",
        url: "https://edge1caster.pro/hls/ijfnakfidch22.m3u8?st=NEBEhwuUuahip4nKSiCAt9RhNoCi-yo7aNgG26_hs8I&e=1751401707",
        type: "Tv"
    }, 
    {
        name: "Mlb 2 - LAA vs ATL ( 7:10 PM/ET )",
        url: "https://edge1caster.pro/hls/jnzkdzjfanch23.m3u8?st=F7rQG5tDTbQ0IUF7fwWFzoDccjBFWte4jg2r0gfJPJ4&e=1751402241",
        type: "Tv"
    },
    {
        name: "Mlb 3 - HOU - COL ( 8:40 PM/ET )",
        url: "https://eastcaster.pro/hls/dzjhkfazbka26.m3u8?st=EHP7Q_BxhWzNCpLP9W8rAaq_lj5460QYaJ8SYCXHlB8&e=1751402262",
        type: "Tv"
    }, 
      
];

let currentTrack = 0;
const mediaPlayer = document.getElementById('mediaPlayer');
const playlist = document.getElementById('playlist');

// Inicializar reproductor
function initPlayer() {
    // Generar playlist
    mediaFiles.forEach((media, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        item.innerHTML = `
            ${media.name}
            <span class="format-badge">${media.type.toUpperCase()}</span>
        `;
        item.onclick = () => loadMedia(index);
        playlist.appendChild(item);
    });

    // Cargar primer medio
    loadMedia(0);
}

function loadMedia(index) {
    currentTrack = index;
    const media = mediaFiles[index];
    
    // Actualizar clase activa en playlist
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    // Cargar medio según tipo
    if (media.type === 'm3u') {
        loadM3U(media.url);
    } else {
        mediaPlayer.src = media.url;
        mediaPlayer.play();
    }
}

async function loadM3U(url) {
    try {
        const response = await fetch(url);
        const content = await response.text();
        // Procesar M3U y extraer URLs
        const urls = content.match(/^(?!#).+$/gm);
        if (urls && urls.length > 0) {
            mediaPlayer.src = urls[0];
            mediaPlayer.play();
        }
    } catch (error) {
        console.error('Error loading M3U:', error);
    }
}

function playPause() {
    if (mediaPlayer.paused) {
        mediaPlayer.play();
    } else {
        mediaPlayer.pause();
    }
}

function nextTrack() {
    const next = (currentTrack + 1) % mediaFiles.length;
    loadMedia(next);
}

function previousTrack() {
    const prev = (currentTrack - 1 + mediaFiles.length) % mediaFiles.length;
    loadMedia(prev);
}

function toggleMute() {
    mediaPlayer.muted = !mediaPlayer.muted;
}

// Eventos del reproductor
mediaPlayer.addEventListener('ended', () => {
    nextTrack();
});

mediaPlayer.addEventListener('error', (e) => {
    console.error('Error en la reproducción:', e);
    nextTrack();
});

// Inicializar
initPlayer();


  
