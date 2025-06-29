// Configuración de medios predefinidos
const mediaFiles = [
    {
        name: "Venearci",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/venearci-intro-video4.mp4",
        type: "..."
    },
    {
        name: "Mlb - PIT - NYM ( 1:35 PM )",
        url: "https://eastcaster.pro/hls/bzagLHzach19.m3u8?st=H36fLtMJX6ypaOa4XtDNZyYhYrTn8WQ5A0gGKfRdcmc&e=1751139649",
        type: "Tv"
    }, 
    {
        name: "Mlb 2 - ATL vs PHI ( 1:35 PM )",
        url: "https://edge1caster.pro/hls/hefbafbakx28.m3u8?st=PHeXdj2S8vNi9m8QuiofwDFzz6BU3NJndT1v0cZQzPc&e=1751139979",
        type: "Tv"
    },
    {
        name: "Mlb 3 - CHC - HOU ( 2:10 PM )",
        url: "https://edge1caster.pro/hls/jzabfazkbf27.m3u8?st=9hq-qPWpF44RQFgrG5vSO9ssCVzHOW4sVO88qUb6Fos&e=1751139840",
        type: "Tv"
    }, 
    {
        name: "Fox Sports",
        url: "https://ewvz.fubohd.com/foxsportsmx/mono.m3u8?token=62ae50027f577ef2ff784bd09900ab4148ee5be8-21-1751182198-1751164198",
        type: "Video"
    },
    {
        name: "Fox Sports 2",
        url: "https://wp9xqedt.fubohd.com/foxsports2mx/mono.m3u8?token=1051ddc51458866567a97ebe3ac26f3743d70afc-a7-1751182114-1751164114",
        type: "Video"
    },
    {
        name: "Fox Sports 3",
        url: "https://bmf0aw9u.fubohd.com/foxsports3mx/mono.m3u8?token=0981745bda7030c03e9d1d3f17d13e65b395143e-b1-1751182260-1751164260",
        type: "Video"
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


  
