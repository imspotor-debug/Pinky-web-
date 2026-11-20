©POCOYO7X 
<html lang="es" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OSVALDO MODZ | Canales Oficiales & Panel</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome 6 para iconos oficiales -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"> 
    <!-- Google Fonts: Inter & Orbitron -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@600;700;800;900&display=swap" rel="stylesheet">
    
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        gamer: ['Orbitron', 'sans-serif'],
                    },
                    animation: {
                        'pulse-crimson': 'pulseCrimson 2.2s infinite ease-in-out',
                        'float': 'float 4.5s ease-in-out infinite',
                        'shimmer': 'shimmer 2.4s linear infinite',
                        'spin-slow': 'spin 8s linear infinite',
                    },
                    keyframes: {
                        pulseCrimson: {
                            '0%, 100%': { 
                                boxShadow: '0 0 18px rgba(220, 38, 38, 0.65), 0 0 38px rgba(153, 27, 27, 0.35)' 
                            },
                            '50%': { 
                                boxShadow: '0 0 30px rgba(239, 68, 68, 0.95), 0 0 60px rgba(220, 38, 38, 0.55)' 
                            },
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-6px)' },
                        },
                        shimmer: {
                            '0%': { transform: 'translateX(-100%)' },
                            '100%': { transform: 'translateX(100%)' }
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-[#070304] text-white min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-x-hidden selection:bg-red-600 selection:text-white">

    <!-- Canvas de Partículas Sutiles en Rojo Carmesí y Negro -->
    <canvas id="crimson-particles" class="fixed inset-0 pointer-events-none z-0"></canvas>

    <!-- Fondo ambiental con luces neón carmesí -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div class="absolute -top-28 -left-24 w-80 h-80 sm:w-[28rem] sm:h-[28rem] bg-red-700/25 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 -right-28 w-80 h-80 sm:w-[26rem] sm:h-[26rem] bg-rose-900/25 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-28 left-1/4 w-80 h-80 sm:w-[26rem] sm:h-[26rem] bg-red-950/40 rounded-full blur-3xl"></div>
        <!-- Cuadrícula oscura sutil -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#dc26260d_1px,transparent_1px),linear-gradient(to_bottom,#dc26260d_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    </div>

    <!-- Contenedor Principal (Tarjeta Glassmorphism Oscuro) -->
    <main class="relative z-10 w-full max-w-md bg-[#0d0608]/80 backdrop-blur-xl border border-red-900/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(153,27,27,0.22)]">
        
        <!-- Encabezado: Avatar Circular y Estado -->
        <header class="flex flex-col items-center text-center mb-7">
            <div class="relative group animate-float">
                <!-- Halo / Glow rojo neón carmesí -->
                <div class="absolute -inset-1.5 bg-gradient-to-tr from-red-700 via-red-500 to-rose-900 rounded-full blur-md opacity-85 group-hover:opacity-100 transition duration-300"></div>
                
                <!-- Contenedor circular del avatar -->
                <div class="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-red-500 bg-[#0d0204] flex items-center justify-center shadow-[0_0_25px_rgba(220,38,38,0.65)]">
                    <!-- Carga por defecto 'IMG-20261116-WA0448.jpg' con respaldo automático -->
                    <img 
                        id="site-logo"
                        src="IMG-20261116-WA0448.jpg" 
                        onerror="activarFallbackAvatar(this)"
                        alt="Avatar Oficial OSVALDO " 
                        class="w-full h-full object-cover object-center"
                    >
                    
                    <!-- Ilustración SVG de respaldo estilo silueta anime carmesí si la imagen local no está en la misma ruta -->
                    <div id="svg-avatar-fallback" class="hidden w-full h-full relative bg-gradient-to-b from-[#45070c] via-[#1f0306] to-black flex items-center justify-center">
                        <svg viewBox="0 0 200 200" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <radialGradient id="crimsonGlow" cx="50%" cy="42%" r="55%">
                                    <stop offset="0%" stop-color="#991b1b" stop-opacity="0.9"/>
                                    <stop offset="65%" stop-color="#450a0a" stop-opacity="0.95"/>
                                    <stop offset="100%" stop-color="#090203" stop-opacity="1"/>
                                </radialGradient>
                                <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="2.5" result="blur"/>
                                    <feMerge>
                                        <feMergeNode in="blur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            <rect width="200" height="200" fill="url(#crimsonGlow)"/>
                            <!-- Silueta de hombros y abrigo oscuro -->
                            <path d="M22 200 C28 152, 55 138, 100 138 C145 138, 172 152, 178 200 Z" fill="#070405"/>
                            <!-- Rostro sombreado -->
                            <path d="M74 86 C74 114, 86 130, 100 132 C114 130, 126 114, 126 86 Z" fill="#1a1214"/>
                            <!-- Cabello anime desordenado -->
                            <path d="M52 96 L42 74 L58 76 L46 52 L68 62 L66 34 L86 50 L98 26 L112 48 L134 32 L132 60 L156 50 L144 74 L162 76 L148 98 L132 88 L124 106 L114 88 L102 110 L94 88 L82 108 L74 88 Z" fill="#050304"/>
                            <!-- Ojos rojos brillantes -->
                            <ellipse cx="87" cy="98" rx="5.5" ry="2.6" fill="#ef4444" filter="url(#eyeGlow)"/>
                            <circle cx="87" cy="98" r="1.4" fill="#fca5a5"/>
                            <ellipse cx="113" cy="98" rx="5.5" ry="2.6" fill="#ef4444" filter="url(#eyeGlow)"/>
                            <circle cx="113" cy="98" r="1.4" fill="#fca5a5"/>
                        </svg>
                    </div>

                    <!-- Botón discreto sobre el avatar para probar/cargar otra imagen al instante -->
                    <label for="avatar-upload" title="Cambiar o cargar imagen manualmente" class="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center cursor-pointer text-xs font-medium text-red-200 z-10">
                        <i class="fa-solid fa-camera text-base text-red-500 mb-1"></i>
                        <span>Cambiar foto</span>
                    </label>
                    <input type="file" id="avatar-upload" accept="image/*" class="hidden" onchange="cargarImagenLocal(event)">
                </div>

                <!-- Badge de estado en línea -->
                <span class="absolute bottom-1 right-1 flex items-center gap-1 bg-[#140709] text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-800/80 shadow-lg z-20" title="Sistema Activo">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>ONLINE</span>
                </span>
            </div>

            <!-- Aviso opcional si se abre en vista previa sin el archivo local al lado -->
            <div id="local-helper" class="hidden mt-3">
                <label for="avatar-upload" class="inline-flex items-center gap-1.5 text-[11px] text-red-300/90 hover:text-white bg-red-950/60 hover:bg-red-900/70 border border-red-800/60 px-3 py-1 rounded-full cursor-pointer transition-colors">
                    <i class="fa-solid fa-image text-red-400"></i>
                    <span>Seleccionar ®POCOYO7X </span>
                </label>
            </div>

            <!-- Título y subtítulo -->
            <h1 class="mt-4 font-gamer text-2xl sm:text-3xl font-black tracking-wider bg-gradient-to-r from-white via-red-100 to-red-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(220,38,38,0.35)]">
                PINKY MODZ
            </h1>
            <p class="mt-1.5 text-sm text-zinc-400 max-w-xs">
                Panel VIP, actualizaciones exclusivas y soporte directo en nuestras redes oficiales.
            </p>
        </header>

        <!-- Sección de Enlaces -->
        <section class="space-y-4">

            <!-- 1. BOTÓN PRINCIPAL DESTACADO: PANEL AQUI -->
            <a href="https://zoralinks.com/r/https-hunter-v54modz-iu2" 
               target="_blank" 
               rel="noopener noreferrer"
               class="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-rose-700 hover:from-red-600 hover:to-rose-600 text-white font-gamer font-bold tracking-wider shadow-lg animate-pulse-crimson transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] overflow-hidden border border-red-400/50">
                
                <!-- Brillo deslizante -->
                <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></span>

                <div class="flex items-center gap-3.5 relative z-10">
                    <div class="w-11 h-11 bg-black/35 rounded-xl backdrop-blur-sm flex items-center justify-center border border-red-400/30">
                        <i class="fa-solid fa-download text-lg text-white group-hover:scale-110 transition-transform"></i>
                    </div>
                    <div class="text-left">
                        <span class="block text-base sm:text-lg leading-tight tracking-widest">PANEL AQUI</span>
                        <span class="block font-sans text-xs font-medium text-red-100/90 tracking-normal">Acceso directo al panel y descarga</span>
                    </div>
                </div>

                <!-- Flecha derecha -->
                <div class="relative z-10 bg-black/30 w-9 h-9 rounded-xl flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <i class="fa-solid fa-chevron-right text-sm"></i>
                </div>
            </a>

            <!-- Separador visual -->
            <div class="flex items-center gap-3 py-1">
                <div class="h-px flex-1 bg-gradient-to-r from-transparent via-red-900/60 to-red-900/60"></div>
                <span class="text-[11px] font-semibold uppercase tracking-widest text-red-400/80">Canales Oficiales</span>
                <div class="h-px flex-1 bg-gradient-to-l from-transparent via-red-900/60 to-red-900/60"></div>
            </div>

            <!-- 2. BOTÓN TELEGRAM -->
            <a href="https://t.me/linkjkrgds13exe" 
               target="_blank" 
               rel="noopener noreferrer"
               class="group flex items-center justify-between w-full p-3.5 rounded-2xl bg-[#140a0c]/85 hover:bg-[#229ED9]/15 border border-red-950/80 hover:border-[#229ED9] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] shadow-md hover:shadow-[0_0_20px_rgba(34,158,217,0.3)]">
                
                <div class="flex items-center gap-3.5">
                    <div class="w-11 h-11 rounded-xl bg-[#229ED9] flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
                        <i class="fa-brands fa-telegram text-2xl"></i>
                    </div>
                    <div class="text-left">
                        <span class="block font-semibold text-base text-white group-hover:text-[#38bdf8] transition-colors">Canal de Telegram</span>
                        <span class="block text-xs text-zinc-400">Actualizaciones, archivos y soporte</span>
                    </div>
                </div>

                <i class="fa-solid fa-chevron-right text-sm text-zinc-500 group-hover:text-[#229ED9] group-hover:translate-x-1 transition-all pr-1"></i>
            </a>

            <!-- 3. BOTÓN WHATSAPP -->
            <a href="https://whatsapp.com/channel/0029Vb7e1V2CMY0N0wdR9X1c" 
               target="_blank" 
               rel="noopener noreferrer"
               class="group flex items-center justify-between w-full p-3.5 rounded-2xl bg-[#140a0c]/85 hover:bg-[#25D366]/15 border border-red-950/80 hover:border-[#25D366] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] shadow-md hover:shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                
                <div class="flex items-center gap-3.5">
                    <div class="w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
                        <i class="fa-brands fa-whatsapp text-2xl"></i>
                    </div>
                    <div class="text-left">
                        <span class="block font-semibold text-base text-white group-hover:text-[#4ade80] transition-colors">Canal de WhatsApp</span>
                        <span class="block text-xs text-zinc-400">Avisos rápidos y novedades al instante</span>
                    </div>
                </div>

                <i class="fa-solid fa-chevron-right text-sm text-zinc-500 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all pr-1"></i>
            </a>

            <!-- 4. BOTÓN DISCORD -->
            <a href="https://discord.gg/tSV9fRBdW" 
               target="_blank" 
               rel="noopener noreferrer"
               class="group flex items-center justify-between w-full p-3.5 rounded-2xl bg-[#140a0c]/85 hover:bg-[#5865F2]/15 border border-red-950/80 hover:border-[#5865F2] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] shadow-md hover:shadow-[0_0_20px_rgba(88,101,242,0.35)]">
                
                <div class="flex items-center gap-3.5">
                    <div class="w-11 h-11 rounded-xl bg-[#5865F2] flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
                        <i class="fa-brands fa-discord text-xl"></i>
                    </div>
                    <div class="text-left">
                        <span class="block font-semibold text-base text-white group-hover:text-[#818cf8] transition-colors">Servidor de Discord</span>
                        <span class="block text-xs text-zinc-400">Chat en vivo, comunidad y ayuda</span>
                    </div>
                </div>

                <i class="fa-solid fa-chevron-right text-sm text-zinc-500 group-hover:text-[#5865F2] group-hover:translate-x-1 transition-all pr-1"></i>
            </a>

        </section>

        <!-- Pie de tarjeta con botón para copiar el enlace -->
        <footer class="mt-7 pt-5 border-t border-red-950/70 flex flex-col items-center gap-3">
            <button 
                id="copy-btn"
                onclick="copiarEnlace()"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#180a0d] hover:bg-red-950/80 text-zinc-300 hover:text-white text-xs font-medium transition-colors border border-red-900/50 cursor-pointer">
                <i class="fa-regular fa-copy text-red-400"></i>
                <span id="copy-text">Copiar enlace de la página</span>
            </button>

            <p class="text-[11px] text-zinc-500 text-center">
                &copy; 2026 PINKY MODZ &bull;
            </p>
        </footer>

    </main>

    <!-- Notificación flotante (Toast) al copiar enlace -->
    <div id="toast" class="fixed bottom-5 left-1/2 -translate-x-1/2 translate-y-20 opacity-0 bg-red-600 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.6)] transition-all duration-300 z-50 flex items-center gap-2 pointer-events-none border border-red-400/50">
        <i class="fa-solid fa-check"></i>
        <span>¡Enlace copiado al portapapeles!</span>
    </div>

    <script>
        // Fallback automático: intenta primero el segundo nombre de archivo y luego muestra el avatar SVG carmesí
        let intentoSecundario = false;
        function activarFallbackAvatar(imgElement) {
            if (!intentoSecundario) {
                intentoSecundario = true;
                imgElement.src = 'IMG-20261024-WA0041(1).jpg';
                return;
            }
            imgElement.onerror = null;
            imgElement.classList.add('hidden');
            const svgFallback = document.getElementById('svg-avatar-fallback');
            if (svgFallback) {
                svgFallback.classList.remove('hidden');
            }
            const helper = document.getElementById('local-helper');
            if (helper) {
                helper.classList.remove('hidden');
            }
        }

        // Permite cargar el archivo local al instante para previsualizarlo
        function cargarImagenLocal(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = document.getElementById('site-logo');
                const svgFallback = document.getElementById('svg-avatar-fallback');
                if (svgFallback) {
                    svgFallback.classList.add('hidden');
                }
                imgElement.classList.remove('hidden');
                imgElement.src = e.target.result;
                const helper = document.getElementById('local-helper');
                if (helper) {
                    helper.classList.add('hidden');
                }
            };
            reader.readAsDataURL(file);
        }

        // Copiar enlace de la página al portapapeles
        function copiarEnlace() {
            const tempInput = document.createElement('input');
            tempInput.value = window.location.href;
            document.body.appendChild(tempInput);
            tempInput.select();
            try {
                document.execCommand('copy');
                mostrarToast();
            } catch (err) {
                console.error('Error al copiar:', err);
            }
            document.body.removeChild(tempInput);
        }

        function mostrarToast() {
            const toast = document.getElementById('toast');
            toast.classList.remove('translate-y-20', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
                toast.classList.remove('translate-y-0', 'opacity-100');
            }, 2500);
        }

        // Sistema de partículas sutiles en rojo carmesí y negro
        window.addEventListener('load', () => {
            const canvas = document.getElementById('crimson-particles');
            const ctx = canvas.getContext('2d');
            let particles = [];

            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            const particleCount = Math.min(45, Math.floor(window.innerWidth / 25));
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2.2 + 0.6,
                    speedY: -(Math.random() * 0.45 + 0.15),
                    speedX: (Math.random() - 0.5) * 0.3,
                    alpha: Math.random() * 0.55 + 0.15
                });
            }

            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let p of particles) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(220, 38, 38, ${p.alpha})`;
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = 'rgba(239, 68, 68, 0.8)';
                    ctx.fill();

                    p.y += p.speedY;
                    p.x += p.speedX;

                    if (p.y < -10) {
                        p.y = canvas.height + 10;
                        p.x = Math.random() * canvas.width;
                    }
                    if (p.x < -10) p.x = canvas.width + 10;
                    if (p.x > canvas.width + 10) p.x = -10;
                }
                requestAnimationFrame(animateParticles);
            }
            animateParticles();
        });
    </script>
</body>
</html>