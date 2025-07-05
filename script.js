// Configuración de medios predefinidos
const mediaFiles = [

    //https://cdn-cf-east.streamable.com/video/mp4/vgjtki.mp4?Expires=1751732394861&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=GxuWr~cKDwaJ5yfxjKo51V39SB9njyI5xPOhkfSI3lyvLmM-MAlf31YGEDLOn7Zbcbv-4BpBjtppewMaOFzIMRcrrGs-b7k2vFLu5n4KQGDNN8yZjfZhRyiKfjJMmMXP9cIEbtwkJhWooJ5-vTziSPwD6gmO-Lsm0ij6qipTopm3IGZWVa1QtZwx4r0rfw4jbJMIEt--1GMt3wnMitmgSFaxGH1-CbkiWzItIsGX6E-lI-Ma3Qx4ridh6MzG~zudzZaSjrZH6nti3dNhuAX80cYvHiKxFQ~rgWVkHteVIzNsdgFIP4AeXnUTVRuW620ib54esz2TpGFhg7PVMuU88w__
    {
        name: "Venearci",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/venearci-intro-video3.mp4",
        type: "..."
    },
    {
        name: "Mlb - NYY - NYM ( 4:10 PM/ET )",
        url: "https://eastcaster.pro/hls/ojzkajnach21.m3u8?st=oYeR9F_w-SXLAqOS82cysRXwyg3L0rCShOTwiLwsEHw&e=1751745347",
        type: "Tv"
    }, 
    {
        name: "Mlb 2 - BAL vs ATL ( 4:10 PM/ET )",
        url: "https://eastcaster.pro/hls/jkzahzadach20.m3u8?st=a_EiKw3BrPFhGOaTzwZCrI1aEhCnTqgMLS8_IY66iT4&e=1751745171",
        type: "Tv"
    },
    {
        name: "Mlb 3 - HOU - LAD ( 7:15 PM/ET )",
        url: "https://edge1caster.pro/hls/kjhfzua25.m3u8?st=71N0PfY8wWq7WvSjL2Ihsz3PB3JnkE_eFeMP6fXti4Q&e=1751745478",
        type: "Tv"
    }, 

    {
        name: "©Venearci",
        url: "https://cdn-cf-east.streamable.com/video/mp4/vgjtki.mp4?Expires=1751732394861&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=GxuWr~cKDwaJ5yfxjKo51V39SB9njyI5xPOhkfSI3lyvLmM-MAlf31YGEDLOn7Zbcbv-4BpBjtppewMaOFzIMRcrrGs-b7k2vFLu5n4KQGDNN8yZjfZhRyiKfjJMmMXP9cIEbtwkJhWooJ5-vTziSPwD6gmO-Lsm0ij6qipTopm3IGZWVa1QtZwx4r0rfw4jbJMIEt--1GMt3wnMitmgSFaxGH1-CbkiWzItIsGX6E-lI-Ma3Qx4ridh6MzG~zudzZaSjrZH6nti3dNhuAX80cYvHiKxFQ~rgWVkHteVIzNsdgFIP4AeXnUTVRuW620ib54esz2TpGFhg7PVMuU88w__",
        type: ""
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


  
