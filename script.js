// Configuración de medios predefinidos
const mediaFiles = [
    {
        name: "Venearci",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/venearci-intro-video4.mp4",
        type: "..."
    },
    {
        name: "Mlb - PIT - NYM ( 4:10 PM )",
        url: "https://eastcaster.pro/hls/bzagLHzach19.m3u8?st=H36fLtMJX6ypaOa4XtDNZyYhYrTn8WQ5A0gGKfRdcmc&e=1751139649",
        type: "Tv"
    }, 
    {
        name: "Mlb 2 - ATL vs PHI",
        url: "https://edge1caster.pro/hls/ijfnakfidch22.m3u8?st=jixfMM312qj-Yv_qW9kXudHrp2vWetB6GoCuZk1LrL8&e=1751054778",
        type: "Tv"
    },
    {
        name: "Mlb 3 - CHC - HOU",
        url: "https://edge1caster.pro/hls/kjhfzua25.m3u8?st=B36ioZl-n-HgU6Xo428JVcoo2TMUFitqlR3DuiqNd2E&e=1751054858",
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


  
