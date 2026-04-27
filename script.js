// Cambio de color del Nav
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('nav-active', window.scrollY > 80);
});

// Activador de animaciones al bajar (Scroll)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.revelar').forEach(el => observer.observe(el));

//Modo Noche con Web Storage 
const logo = document.querySelector('.logo-container');
const body = document.body;

if (localStorage.getItem('modo-noche') === 'activado') {
    body.classList.add('dark-mode');
}

if (logo) {
    logo.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('modo-noche', 'activado');
            console.log("Modo noche activado y guardado");
        } else {
            localStorage.setItem('modo-noche', 'desactivado');
            console.log("Modo noche desactivado y guardado");
        }
    });
}

// FUNCIONALIDAD DE VIDEO
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('miVideo');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');

    console.log("Video detectado:", video); // Esto saldrá en la consola (F12)

    if (video && playBtn && pauseBtn) {
        playBtn.onclick = () => {
            console.log("Diste play");
            video.play();
        };
        pauseBtn.onclick = () => {
            console.log("Diste pausa");
            video.pause();
        };
    } else {
        console.error("No se encontraron los elementos del video");
    }
});

//LÓGICA DEL JUEGO
const pieces = document.querySelectorAll('.piece');
const zones = document.querySelectorAll('.zona-drop');
const tablero = document.getElementById('tablero'); 
const instrucciones = document.getElementById('instrucciones');
const areaJuego = document.getElementById('area-juego'); 
const resultadoFinal = document.getElementById('resultado-final');
const resultadoSuperp = document.getElementById('resultado-superp');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Inicialización al cargar la página
window.onload = () => {
    desperdigarPiezas();
};

function desperdigarPiezas() {
    const container = document.getElementById('caos-container');
    if (!container) return;

    const width = container.offsetWidth;
    const height = 300; 

    pieces.forEach(p => {
        const lado = Math.random() > 0.5 ? 'izq' : 'der';
        let randomX;
        
        if (lado === 'izq') {
            randomX = Math.random() * 100; 
        } else {
            randomX = (width - 250) + Math.random() * 100;
        }

        const randomY = Math.random() * height;
        const randomRot = (Math.random() - 0.5) * 50;

        p.style.position = 'absolute';
        p.style.left = `${randomX}px`;
        p.style.top = `${randomY}px`;
        p.style.transform = `rotate(${randomRot}deg)`;
        p.style.opacity = '1';
    });
}

// Eventos de Arrastre
pieces.forEach(p => {
    p.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id);
    });
});

// Eventos de Soltado
zones.forEach(z => {
    z.addEventListener('dragover', (e) => e.preventDefault());
    z.addEventListener('drop', (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const piezaArrastrada = document.getElementById(id);

        if (z.children.length <= 1) {
            z.innerHTML = ''; 
            
            piezaArrastrada.style.position = 'static';
            piezaArrastrada.style.transform = 'rotate(0deg)';
            piezaArrastrada.style.width = "100%";
            piezaArrastrada.style.height = "100%";
            
            z.appendChild(piezaArrastrada);
            verificarEstado();
        }
    });
});

// Verificación de Victoria/Derrota
function verificarEstado() {
    const piezasColocadas = Array.from(zones).filter(z => z.querySelector('img'));
    
    if (piezasColocadas.length === 3) {
        if (areaJuego) areaJuego.style.display = 'none';
        if (instrucciones) instrucciones.style.display = 'none'; 
        if (resultadoFinal) resultadoFinal.style.display = 'block';

        const esCorrecto = Array.from(zones).every(z => {
            const img = z.querySelector('img');
            return z.dataset.id === img.id;
        });

        if (esCorrecto) {
            resultadoSuperp.innerHTML = '<h2>Felicitaciones!!<br>Puzzle correctamente resuelto</h2>';
        } else {
            resultadoSuperp.innerHTML = '<h2 style="color:#2F3645">Lo sentimos, Puzzle no resuelto.<br>Prueba otra vez</h2>';
        }
    }
}

// Botón Reiniciar
if (btnReiniciar) {
    btnReiniciar.addEventListener('click', () => {
        location.reload(); 
    });
}