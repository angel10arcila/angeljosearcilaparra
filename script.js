// Configuración de medios predefinidos
const mediaFiles = [
    
    {
        name: "Mlb - PIT - NYM",
        url: "https://eastcaster.pro/hls/iueyzbvezch16.m3u8?st=1xMa9OxS2mFGWXcNwwXAuGk-g023-tbZeuNOlpVpG_M&e=1750963474",
        type: "Tv"
    }, 
    {
        name: "Mlb 2 - Phillies vs Astros",
        url: "https://edge1caster.pro/hls/Czajafjihafch18.m3u8?st=dCKN3l8smjVEod5YZ-6PzrgmSysQtagfhQIQSrHho84&e=1750963288",
        type: "Tv"
    },
    {
        name: "Mlb 3 - Braves vs Mets",
        url: "https://eastcaster.pro/hls/jnzkdzjfanch23.m3u8?st=jsnXIe_EsoXbmcS0sa98clRSOBh_Iph0Qd0mHF6J2A4&e=1750963695",
        type: "Tv"
    },     
    {
        name: "Space Cityhn",
        url: "https://tvpass.org/live/sny-sportsnet-new-york-comcast/hd",
        type: "Tv"
    },
   {
        name: "Mlb network HD",
        url: "https://tvpass.org/live/MLBNetwork/hd",
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


  
