// Configuración de medios predefinidos
const mediaFiles = [
    {
        name: "Venearci",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/venearci-intro-video3.mp4",
        type: "..."
    },
    {
        name: "Mlb - MIL - NYM ( 7:10 PM/ET | 1-7-2025 )",
        url: "https://cdn-cf-east.streamable.com/video/mp4/vgjtki.mp4?Expires=1751561168646&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=RWEaOMiFhs3ahp8OpwlUC7ERnjknUi-Cd-rxRR8rHUbqYelB1KkfE7mlVVd8L8j0cdYwifaH0D8lxyzSwfj~wjxdwX1zX9L~93Pkmiikry6vb1p1SrcABjfIWBeqEgIV8Lr49hsyWDYFp2duHxpxBuYdAKq4C9-QFkLar5F7TfvqCTcuoGZldfxudUlfDMRL9ml2Qy5-ryQk~QI3zrVi53BaYOq5e3OMhxzMuyWe2JR5dHkhJ-mfw0DbgriR7F53n6H1~agWJHx8ZcMlAynypE6SRS4qpvG82OZmSYpLzlPQkUDqz3HveKAu3RKCjteXkK~-Dl~5ZCL4hvjd3g3K5Q__",
        type: "Tv"
    }, 
    {
        name: "Mlb 2 - LAA vs ATL ( 7:10 PM/ET | 1-7-2025 )",
        url: "https://cdn-cf-east.streamable.com/video/mp4/vgjtki.mp4?Expires=1751561168646&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=RWEaOMiFhs3ahp8OpwlUC7ERnjknUi-Cd-rxRR8rHUbqYelB1KkfE7mlVVd8L8j0cdYwifaH0D8lxyzSwfj~wjxdwX1zX9L~93Pkmiikry6vb1p1SrcABjfIWBeqEgIV8Lr49hsyWDYFp2duHxpxBuYdAKq4C9-QFkLar5F7TfvqCTcuoGZldfxudUlfDMRL9ml2Qy5-ryQk~QI3zrVi53BaYOq5e3OMhxzMuyWe2JR5dHkhJ-mfw0DbgriR7F53n6H1~agWJHx8ZcMlAynypE6SRS4qpvG82OZmSYpLzlPQkUDqz3HveKAu3RKCjteXkK~-Dl~5ZCL4hvjd3g3K5Q__",
        type: "Tv"
    },
    {
        name: "Mlb 3 - HOU - COL ( 8:40 PM/ET | 1-7-2025 )",
        url: "https://cdn-cf-east.streamable.com/video/mp4/vgjtki.mp4?Expires=1751561168646&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=RWEaOMiFhs3ahp8OpwlUC7ERnjknUi-Cd-rxRR8rHUbqYelB1KkfE7mlVVd8L8j0cdYwifaH0D8lxyzSwfj~wjxdwX1zX9L~93Pkmiikry6vb1p1SrcABjfIWBeqEgIV8Lr49hsyWDYFp2duHxpxBuYdAKq4C9-QFkLar5F7TfvqCTcuoGZldfxudUlfDMRL9ml2Qy5-ryQk~QI3zrVi53BaYOq5e3OMhxzMuyWe2JR5dHkhJ-mfw0DbgriR7F53n6H1~agWJHx8ZcMlAynypE6SRS4qpvG82OZmSYpLzlPQkUDqz3HveKAu3RKCjteXkK~-Dl~5ZCL4hvjd3g3K5Q__",
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


  
