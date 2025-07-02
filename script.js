// Configuración de medios predefinidos
const mediaFiles = [

    //https://cdn-cf-east.streamable.com/video/mp4/vgjtki.mp4?Expires=1751651416139&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=F3r8fVpfOlUCoeotenRcVmbwaCFOTUZoDTLb3nHWwQxEXPTRFdo0b2gzuFVmt00dbNd6A6fbcQ1njslGhyxaQ9qYUpHFtdlhyO4GlVbuQyE919eGi5Vm0hkK3wDZ6HquDAoDYWg9CYnwpE8UP~5by~Mfl32AG3ImSU4dM1KAATwhPpJZpIBOehcU~U1wKJlMKjMQRR275BbzZ3CoAvfQZAIth0AqjdT7fF15~PJ--Fh5~YmXzQ7~7uz1axSwrI-1mq1O2KXRkS1zlmTnNz7qZ5YijNXaexUhBW~acmzZouw3XP8r7QoNvNnp5SuqZmS3H70Pz2cGLeVtvXLJKArI6A__
    {
        name: "Venearci",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/venearci-intro-video3.mp4",
        type: "..."
    },
    {
        name: "Mlb - MIL - NYM ( 1:10 PM/ET )",
        url: "https://edge1caster.pro/hls/bzagLHzach19.m3u8?st=uBf8xpus_ZQux3ZLMwZsY4uzV0UleuRTM3UoaqKg9jY&e=1751480078",
        type: "Tv"
    }, 
    {
        name: "Mlb 2 - LAA vs ATL ( 7:10 PM/ET )",
        url: "//https://cdn-cf-east.streamable.com/video/mp4/vgjtki.mp4?Expires=1751651416139&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=F3r8fVpfOlUCoeotenRcVmbwaCFOTUZoDTLb3nHWwQxEXPTRFdo0b2gzuFVmt00dbNd6A6fbcQ1njslGhyxaQ9qYUpHFtdlhyO4GlVbuQyE919eGi5Vm0hkK3wDZ6HquDAoDYWg9CYnwpE8UP~5by~Mfl32AG3ImSU4dM1KAATwhPpJZpIBOehcU~U1wKJlMKjMQRR275BbzZ3CoAvfQZAIth0AqjdT7fF15~PJ--Fh5~YmXzQ7~7uz1axSwrI-1mq1O2KXRkS1zlmTnNz7qZ5YijNXaexUhBW~acmzZouw3XP8r7QoNvNnp5SuqZmS3H70Pz2cGLeVtvXLJKArI6A__",
        type: "Tv"
    },
    {
        name: "Mlb 3 - HOU - COL ( 8:40 PM/ET )",
        url: "//https://cdn-cf-east.streamable.com/video/mp4/vgjtki.mp4?Expires=1751651416139&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=F3r8fVpfOlUCoeotenRcVmbwaCFOTUZoDTLb3nHWwQxEXPTRFdo0b2gzuFVmt00dbNd6A6fbcQ1njslGhyxaQ9qYUpHFtdlhyO4GlVbuQyE919eGi5Vm0hkK3wDZ6HquDAoDYWg9CYnwpE8UP~5by~Mfl32AG3ImSU4dM1KAATwhPpJZpIBOehcU~U1wKJlMKjMQRR275BbzZ3CoAvfQZAIth0AqjdT7fF15~PJ--Fh5~YmXzQ7~7uz1axSwrI-1mq1O2KXRkS1zlmTnNz7qZ5YijNXaexUhBW~acmzZouw3XP8r7QoNvNnp5SuqZmS3H70Pz2cGLeVtvXLJKArI6A__",
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


  
