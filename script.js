// Configuración de medios predefinidos
const mediaFiles = [
    {
        name: "Venearci",
        url: "https://raw.githubusercontent.com/angel10arcila/videos/refs/heads/main/venearci-intro-video3.mp4",
        type: "..."
    },
    {
        name: "Mlb - MIL - NYM ( 7:10 PM/ET | 1-7-2025 )",
        url: "https://rr2---sn-j5ou8-jjnr.googlevideo.com/videoplayback?expire=1751290530&ei=IiJiaPSZO--p0_wPuILUuQ0&ip=200.93.97.245&id=3ac2e8572b7a8f77&itag=18&source=blogger&xpc=Egho7Zf3LnoBAQ%3D%3D&met=1751261730,&mh=3F&mm=31&mn=sn-j5ou8-jjnr&ms=au&mv=m&mvi=2&pl=21&rms=au,au&susc=bl&eaua=6nhKNbBj1L4&mime=video/mp4&vprv=1&rqh=1&dur=52.500&lmt=1751261697051433&mt=1751261572&txp=1311224&sparams=expire,ei,ip,id,itag,source,xpc,susc,eaua,mime,vprv,rqh,dur,lmt&sig=AJfQdSswRQIhAPrgv-rlqgMd4sY1mVvevI1zT7EyQC7mSDK-0TrqkDJkAiBn_-XTA4VbFlptZ7v_miWboWmjqyv0XjwZtHk0RZsQQQ%3D%3D&lsparams=met,mh,mm,mn,ms,mv,mvi,pl,rms&lsig=APaTxxMwRAIgSTIdlw0uZbIgcBuNW1bci66lPTYzX-_ek9D4SzVHgjQCICnq3mVfvEHQ_g0geeXBlCTW_clUJgOVARNo2-XnR6Ck&cpn=4Iv_Y2_z7ihqC5SQ&c=WEB_EMBEDDED_PLAYER&cver=1.20250624.21.00",
        type: "Tv"
    }, 
    {
        name: "Mlb 2 - LAA vs ATL ( 7:10 PM/ET | 1-7-2025 )",
        url: "https://rr2---sn-j5ou8-jjnr.googlevideo.com/videoplayback?expire=1751290530&ei=IiJiaPSZO--p0_wPuILUuQ0&ip=200.93.97.245&id=3ac2e8572b7a8f77&itag=18&source=blogger&xpc=Egho7Zf3LnoBAQ%3D%3D&met=1751261730,&mh=3F&mm=31&mn=sn-j5ou8-jjnr&ms=au&mv=m&mvi=2&pl=21&rms=au,au&susc=bl&eaua=6nhKNbBj1L4&mime=video/mp4&vprv=1&rqh=1&dur=52.500&lmt=1751261697051433&mt=1751261572&txp=1311224&sparams=expire,ei,ip,id,itag,source,xpc,susc,eaua,mime,vprv,rqh,dur,lmt&sig=AJfQdSswRQIhAPrgv-rlqgMd4sY1mVvevI1zT7EyQC7mSDK-0TrqkDJkAiBn_-XTA4VbFlptZ7v_miWboWmjqyv0XjwZtHk0RZsQQQ%3D%3D&lsparams=met,mh,mm,mn,ms,mv,mvi,pl,rms&lsig=APaTxxMwRAIgSTIdlw0uZbIgcBuNW1bci66lPTYzX-_ek9D4SzVHgjQCICnq3mVfvEHQ_g0geeXBlCTW_clUJgOVARNo2-XnR6Ck&cpn=4Iv_Y2_z7ihqC5SQ&c=WEB_EMBEDDED_PLAYER&cver=1.20250624.21.00",
        type: "Tv"
    },
    {
        name: "Mlb 3 - HOU - COL ( 8:40 PM/ET | 1-7-2025 )",
        url: "https://rr2---sn-j5ou8-jjnr.googlevideo.com/videoplayback?expire=1751290530&ei=IiJiaPSZO--p0_wPuILUuQ0&ip=200.93.97.245&id=3ac2e8572b7a8f77&itag=18&source=blogger&xpc=Egho7Zf3LnoBAQ%3D%3D&met=1751261730,&mh=3F&mm=31&mn=sn-j5ou8-jjnr&ms=au&mv=m&mvi=2&pl=21&rms=au,au&susc=bl&eaua=6nhKNbBj1L4&mime=video/mp4&vprv=1&rqh=1&dur=52.500&lmt=1751261697051433&mt=1751261572&txp=1311224&sparams=expire,ei,ip,id,itag,source,xpc,susc,eaua,mime,vprv,rqh,dur,lmt&sig=AJfQdSswRQIhAPrgv-rlqgMd4sY1mVvevI1zT7EyQC7mSDK-0TrqkDJkAiBn_-XTA4VbFlptZ7v_miWboWmjqyv0XjwZtHk0RZsQQQ%3D%3D&lsparams=met,mh,mm,mn,ms,mv,mvi,pl,rms&lsig=APaTxxMwRAIgSTIdlw0uZbIgcBuNW1bci66lPTYzX-_ek9D4SzVHgjQCICnq3mVfvEHQ_g0geeXBlCTW_clUJgOVARNo2-XnR6Ck&cpn=4Iv_Y2_z7ihqC5SQ&c=WEB_EMBEDDED_PLAYER&cver=1.20250624.21.00",
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


  
