
// Configuración de medios predefinidos
const mediaFiles = [

     {
         name: "Lamborghini - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Lamborghini - Ángel José Arcila Parra .mp3",
         type: "audio"
     },
       
     {
         name: "Lamborghini V2 - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Lamborghini  V2 - Ángel José Arcila Parra .mp3",
         type: "audio"
     },
     
     {
         name: "Lamborghini V3 - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Lamborghini v3 - Ángel José Arcila Parra .mp3",
         type: "audio"
     },
     
     {
         name: "Lamborghini V4- Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Lamborghini V4 - Ángel José Arcila Parra .mp3",
         type: "audio"
     },
     
     {
         name: "Lamborghini V5 - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Lamborghini V5 - Ángel José Arcila Parra .mp3",
         type: "audio"
     },
     
     {
         name: "Lamborghini salsa - Ángel José Arcila Parra",
         url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Lamborghini V6 - versión salsa - Ángel José Arcila Parra .mp3",
         type: "audio"
     },
     
    { 
        name:"Lamborghini Huracán",
        url:"https://videolamborghini-meride-tv.akamaized.net/video/folder1/1668513297lamborghini_bridge_long_cut_mix_web_20221111_CLEAN_2_lamborghini/1668513297lamborghini_bridge_long_cut_mix_web_20221111_CLEAN_2_lamborghini_1219.m3u8",
        type:"Movie"
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